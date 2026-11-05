"""
Chapter 5 Design Principles applied in this module:
1. Single Responsibility Principle (SRP) & High Cohesion (LCOM = 0):
   - `InventoryService` handles ONLY product creation and stock adjustments.
   - `OrderService` handles ONLY order placement and kitchen status progression.
   - `LiveMetricsEngine` handles ONLY real-time operational KPIs, oven capacity, and demand forecasting.
2. Low Coupling & Dependency Inversion Principle (DIP):
   - Services never import `sqlite3`. They depend strictly on abstract interfaces
     (`InventoryManager`, `OrderRepository`, `PaymentStrategy`, `QueueSlaCalculator`).
"""

from datetime import datetime
from typing import Dict, Any, List
from domain.entities import (
    Order,
    OrderItem,
    PICKUP_LOCATIONS,
    CANTEEN_CAPACITY_SPEC,
    PERSONA_PROFILES,
)
from domain.interfaces import (
    InventoryManager,
    OrderRepository,
    PaymentStrategy,
    QueueSlaCalculator,
)


class InventoryService:
    """Single Responsibility: manage menu items and bakery stock levels."""

    def __init__(self, inventory_manager: InventoryManager) -> None:
        self._inventory = inventory_manager

    def list_catalog(self) -> List[Dict[str, Any]]:
        return [product.to_dict() for product in self._inventory.list_products()]

    def register_product(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        name = str(payload.get("name", "")).strip()
        if not name:
            raise ValueError("Informe o nome do produto.")
        category = str(payload.get("category", "Salgados & Forno")).strip()
        price = float(payload.get("price", 0))
        prep_time_min = int(payload.get("prep_time_min", 2))
        stock = int(payload.get("stock", 15))
        image_url = (
            str(payload.get("image_url", "/static/images/coxinha.jpg")).strip()
            or "/static/images/coxinha.jpg"
        )
        badge = str(payload.get("badge", "Novo no Cardápio")).strip()
        description = str(payload.get("description", "")).strip()
        ingredients = str(payload.get("ingredients", "")).strip()
        icon = str(payload.get("icon", "🥐")).strip() or "🥐"

        created = self._inventory.create_product(
            name=name,
            category=category,
            price=price,
            prep_time_min=prep_time_min,
            stock=stock,
            image_url=image_url,
            badge=badge,
            description=description,
            ingredients=ingredients,
            icon=icon,
        )
        return created.to_dict()

    def adjust_stock(self, product_id: int, new_stock: int) -> Dict[str, Any]:
        updated = self._inventory.save_stock(product_id, int(new_stock))
        return updated.to_dict()


class OrderService:
    """
    Single Responsibility: coordinate student order placement and kitchen status transitions,
    delegating payment calculation and queue estimation to composed strategies.
    """

    def __init__(
        self,
        inventory_manager: InventoryManager,
        order_repository: OrderRepository,
        payment_strategies: Dict[str, PaymentStrategy],
        queue_calculator: QueueSlaCalculator,
    ) -> None:
        self._inventory = inventory_manager
        self._orders = order_repository
        self._payments = payment_strategies
        self._queue_calculator = queue_calculator

    def place_order(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        student_name = str(payload.get("student_name", "")).strip() or "Lucas (CC)"
        pickup_location = str(payload.get("pickup_location", "BRUM")).strip()
        time_slot = str(payload.get("time_slot", "15:45")).strip()
        payment_code = str(payload.get("payment_method", "PIX")).strip()
        requested_items = payload.get("items", [])

        if not requested_items:
            raise ValueError("Adicione pelo menos 1 produto ao pedido.")

        strategy = self._payments.get(payment_code)
        if not strategy:
            raise ValueError(f"Forma de pagamento inválida: {payment_code}")

        domain_items: List[OrderItem] = []
        max_prep_time = 2

        for req_item in requested_items:
            product_id = int(req_item["product_id"])
            quantity = int(req_item.get("quantity", 1))
            product = self._inventory.find_product(product_id)
            if not product:
                raise ValueError(f"Produto #{product_id} não encontrado.")

            product.reserve_stock(quantity)
            self._inventory.save_stock(product.id, product.stock)

            max_prep_time = max(max_prep_time, product.prep_time_min)
            domain_items.append(
                OrderItem(
                    product_id=product.id,
                    product_name=product.name,
                    quantity=quantity,
                    unit_price=product.price,
                    prep_time_min=product.prep_time_min,
                    image_url=product.image_url,
                )
            )

        subtotal = round(sum(item.subtotal for item in domain_items), 2)
        final_amount = strategy.calculate_final_amount(subtotal)
        discount_amount = round(max(0.0, subtotal - final_amount), 2)

        existing_orders = self._orders.list_orders()
        estimated_wait = self._queue_calculator.estimate_wait_minutes(
            existing_orders, max_prep_time
        )

        next_number = 101 + len(existing_orders)
        ticket_code = f"PS-{next_number}"
        now_iso = datetime.now().isoformat(timespec="seconds")

        new_order = Order(
            order_id=0,
            ticket_code=ticket_code,
            student_name=student_name,
            pickup_location=pickup_location,
            time_slot=time_slot,
            payment_method=strategy.display_name(),
            items=domain_items,
            subtotal=subtotal,
            final_amount=final_amount,
            discount_amount=discount_amount,
            status="QUEUED",
            created_at=now_iso,
            updated_at=now_iso,
            estimated_wait_min=estimated_wait,
        )

        saved_order = self._orders.save_order(new_order)
        self._orders.increment_hourly_actual(time_slot)
        return saved_order.to_dict(datetime.now())

    def advance_order_stage(self, order_id: int) -> Dict[str, Any]:
        order = self._orders.find_order(order_id)
        if not order:
            raise ValueError(f"Pedido #{order_id} não encontrado.")
        new_status = order.advance_status()
        now_iso = datetime.now().isoformat(timespec="seconds")
        updated = self._orders.update_order_status(order_id, new_status, now_iso)
        return updated.to_dict(datetime.now())

    def re_notify_order(self, order_id: int) -> Dict[str, Any]:
        order = self._orders.find_order(order_id)
        if not order:
            raise ValueError(f"Pedido #{order_id} não encontrado.")
        updated = self._orders.re_notify_order(order_id)
        return updated.to_dict(datetime.now())


class LiveMetricsEngine:
    """
    Single Responsibility: compute real-time kitchen KPIs, oven batch capacity, delay warnings,
    and hourly demand forecasts so Patrícia (attendant) can manage the 15-minute rush.
    """

    def __init__(
        self,
        inventory_manager: InventoryManager,
        order_repository: OrderRepository,
        queue_calculator: QueueSlaCalculator,
    ) -> None:
        self._inventory = inventory_manager
        self._orders = order_repository
        self._queue_calculator = queue_calculator

    def build_live_dashboard(self) -> Dict[str, Any]:
        now = datetime.now()
        all_orders = self._orders.list_orders()
        products = self._inventory.list_products()
        hourly_demand = self._orders.get_hourly_demand()

        serialized_orders = [order.to_dict(now) for order in all_orders]
        by_status = self._group_by_status(serialized_orders)
        active_orders = by_status["QUEUED"] + by_status["PREPARING"]
        active_items_in_ovens = sum(o["total_items_count"] for o in active_orders)
        oven_cycles_active = max(1, (active_items_in_ovens + 7) // 8)
        active_delayed_count = sum(1 for o in active_orders if o["is_delayed"])
        total_delayed_today = sum(
            1 for o in serialized_orders if o.get("was_delayed") or o.get("is_delayed")
        )
        warning_count = sum(1 for o in active_orders if o["urgency_level"] == "WARNING")
        state, headline = self._classify_operation(
            active_delayed_count, warning_count, len(active_orders)
        )

        return {
            "timestamp": now.strftime("%H:%M:%S"),
            "capacity_spec": CANTEEN_CAPACITY_SPEC,
            "personas": PERSONA_PROFILES,
            "summary": {
                "operation_state": state,
                "operation_headline": headline,
                "customers_in_queue": len(active_orders),
                "active_items_in_ovens": active_items_in_ovens,
                "oven_cycles_active": oven_cycles_active,
                "queued_count": len(by_status["QUEUED"]),
                "preparing_count": len(by_status["PREPARING"]),
                "ready_for_pickup_count": len(by_status["READY"]),
                "delivered_today_count": len(by_status["DELIVERED"]),
                "total_orders_today": len(serialized_orders),
                "delayed_orders_count": total_delayed_today,
                "active_delayed_count": active_delayed_count,
                "estimated_wait_min": self._queue_calculator.estimate_wait_minutes(
                    all_orders, 2
                ),
                "revenue_today": round(
                    sum(o["final_amount"] for o in serialized_orders), 2
                ),
                "out_of_stock_count": sum(1 for p in products if p.is_out_of_stock),
                "low_stock_count": sum(1 for p in products if p.is_low_stock),
                "predictive_tip": self._build_predictive_tip(hourly_demand),
            },
            "hourly_chart": hourly_demand,
            "pickup_locations": list(PICKUP_LOCATIONS.values()),
            "orders": serialized_orders,
        }

    @staticmethod
    def _group_by_status(
        orders: List[Dict[str, Any]]
    ) -> Dict[str, List[Dict[str, Any]]]:
        groups: Dict[str, List[Dict[str, Any]]] = {
            "QUEUED": [],
            "PREPARING": [],
            "READY": [],
            "DELIVERED": [],
        }
        for order in orders:
            groups.setdefault(order["status"], []).append(order)
        return groups

    @staticmethod
    def _classify_operation(delayed: int, warning: int, active: int) -> tuple:
        if delayed > 0:
            return (
                "DELAYED",
                f"Atenção Patrícia: {delayed} pedido(s) acima do SLA! Priorize o topo da fila.",
            )
        if warning > 0 or active >= 5:
            return (
                "WARNING",
                f"Pico de intervalo ({active} na fila · 4 salgados/ciclo de 2m). Mantenha o ritmo!",
            )
        return (
            "ON_TRACK",
            "Capacidade controlada! Todos os pedidos dentro da janela de 15 minutos.",
        )

    @staticmethod
    def _build_predictive_tip(hourly_demand: List[Dict[str, Any]]) -> str:
        if not hourly_demand:
            return "Demanda estável."
        peak = max(hourly_demand, key=lambda h: h["forecast_orders"])
        return (
            f"Pico às {peak['time_slot']} (~{peak['forecast_orders']} pedidos online + balcão). "
            "Capacidade: 4 salgados por ciclo de 2 min/máquina — adiante fornada de Coxinha e Pão de Queijo!"
        )
