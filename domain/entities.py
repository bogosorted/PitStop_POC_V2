"""
Chapter 5 Design Principles applied in this module:
1. Information Hiding (Encapsulation):
   - Internal attributes (_stock, _price, _status) are private.
   - Domain invariants (stock never becomes negative; out-of-stock flag is automatically derived)
     are strictly enforced inside the Product class methods.
2. Law of Demeter (Principle of Least Knowledge):
   - Methods such as `order.is_delayed(now)` and `order.advance_status()` encapsulate internal
     transitions and prevent callers from chaining internal objects.
3. Conceptual Integrity & High Cohesion:
   - All identifiers, classes, methods, and attributes follow a strict English standard,
     while user-facing strings remain in Portuguese for the end user.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import List, Dict, Any


CANTEEN_CAPACITY_SPEC = {
    "simultaneous_break_students": 200,
    "break_window_minutes": 15,
    "attendants_count": 2,
    "heating_machines_count": 2,
    "snacks_per_heating_cycle": 4,
    "heating_cycle_minutes": 2,
    "max_online_orders_per_slot": 28,
}


PICKUP_LOCATIONS = {
    "BRUM": {
        "code": "BRUM",
        "name": "Brum",
        "floor": "Rua do Brum · Prédio Principal",
        "target_sla_min": 8,
    },
    "TIRADENTES": {
        "code": "TIRADENTES",
        "name": "Tiradentes",
        "floor": "Praça Tiradentes · Espaço Convivência",
        "target_sla_min": 6,
    },
    "APOLO": {
        "code": "APOLO",
        "name": "Apolo",
        "floor": "Cais do Apolo, 222 · Térreo",
        "target_sla_min": 7,
    },
}


PERSONA_PROFILES = [
    {
        "code": "LUCAS",
        "name": "Lucas (CC · 3º período)",
        "short_name": "Lucas",
        "role": "O aluno com pressa",
        "quote": "Quero chegar à cantina, pegar meu lanche e aproveitar meus 15 minutos.",
        "goal": "Pedir antes, pagar pelo celular (Pix) e retirar rapidamente com a senha.",
        "default_location": "BRUM",
        "default_slot": "15:45",
        "default_payment": "PIX",
    },
    {
        "code": "MARIANA",
        "name": "Mariana (Design · 4º período)",
        "short_name": "Mariana",
        "role": "A aluna planejada",
        "quote": "Quero escolher meu lanche com antecedência e saber quanto vou gastar.",
        "goal": "Consultar preços, ativar combos/cupons e confirmar o total antes de pagar.",
        "default_location": "APOLO",
        "default_slot": "09:45",
        "default_payment": "COMBO_DIA",
    },
    {
        "code": "RAFAEL",
        "name": "Rafael (Eng. Soft · 5º período)",
        "short_name": "Rafael",
        "role": "O aluno do almoço / troca de turno",
        "quote": "Preciso saber se meu almoço estará pronto a tempo de comer antes da próxima aula.",
        "goal": "Consultar o almoço do dia e reservar horário com vaga garantida na capacidade.",
        "default_location": "TIRADENTES",
        "default_slot": "11:30",
        "default_payment": "PIX",
    },
]


class Product:
    """
    Domain Entity applying Information Hiding.
    The `_stock` attribute is private and can only be modified through validated
    domain operations that preserve the invariant: stock >= 0.
    """

    def __init__(
        self,
        product_id: int,
        name: str,
        category: str,
        price: float,
        prep_time_min: int,
        stock: int,
        image_url: str = "/static/images/coxinha.jpg",
        badge: str = "",
        description: str = "",
        ingredients: str = "",
        icon: str = "🍗",
    ) -> None:
        if price < 0:
            raise ValueError("O preço do produto não pode ser negativo.")
        if stock < 0:
            raise ValueError("O estoque inicial não pode ser negativo.")

        self._id = product_id
        self._name = name.strip()
        self._category = category.strip()
        self._price = round(float(price), 2)
        self._prep_time_min = max(1, int(prep_time_min))
        self._stock = int(stock)
        self._image_url = image_url or "/static/images/coxinha.jpg"
        self._badge = badge
        self._description = description.strip()
        self._ingredients = ingredients.strip()
        self._icon = icon or "🍽️"

    @property
    def id(self) -> int:
        return self._id

    @property
    def name(self) -> str:
        return self._name

    @property
    def category(self) -> str:
        return self._category

    @property
    def price(self) -> float:
        return self._price

    @property
    def description(self) -> str:
        return self._description

    @property
    def ingredients(self) -> str:
        return self._ingredients

    @property
    def prep_time_min(self) -> int:
        return self._prep_time_min

    @property
    def stock(self) -> int:
        return self._stock

    @property
    def is_out_of_stock(self) -> bool:
        """Encapsulated domain rule: automatically marked out-of-stock when stock reaches zero."""
        return self._stock <= 0

    @property
    def is_low_stock(self) -> bool:
        """Alerts bakery staff when a fresh batch is needed (1 to 4 units left — 1 oven cycle)."""
        return 0 < self._stock <= 4

    def reserve_stock(self, quantity: int) -> None:
        """Deducts units from stock while enforcing the non-negative invariant."""
        if quantity <= 0:
            raise ValueError("A quantidade deve ser maior que zero.")
        if self._stock < quantity:
            raise ValueError(
                f"'{self._name}' está com estoque insuficiente (disponível: {self._stock})."
            )
        self._stock -= quantity

    def update_stock(self, new_stock: int) -> None:
        """Allows bakery staff to replenish or adjust stock safely."""
        if new_stock < 0:
            raise ValueError("O estoque não pode ficar negativo.")
        self._stock = int(new_stock)

    @property
    def image_url(self) -> str:
        return self._image_url

    @property
    def icon(self) -> str:
        return self._icon

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self._id,
            "name": self._name,
            "category": self._category,
            "price": self._price,
            "prep_time_min": self._prep_time_min,
            "stock": self._stock,
            "is_out_of_stock": self.is_out_of_stock,
            "is_low_stock": self.is_low_stock,
            "image_url": self._image_url,
            "badge": self._badge,
            "description": self._description,
            "ingredients": self._ingredients,
            "icon": self._icon,
        }


@dataclass(frozen=True)
class OrderItem:
    product_id: int
    product_name: str
    quantity: int
    unit_price: float
    prep_time_min: int
    image_url: str = "/static/images/coxinha.jpg"

    @property
    def subtotal(self) -> float:
        return round(self.quantity * self.unit_price, 2)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "product_id": self.product_id,
            "product_name": self.product_name,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "prep_time_min": self.prep_time_min,
            "subtotal": self.subtotal,
            "image_url": self.image_url,
        }


class Order:
    """
    Order Entity applying Law of Demeter and State Encapsulation.
    Status lifecycle: QUEUED -> PREPARING -> READY -> DELIVERED.
    """

    STATUS_TRANSITIONS = {
        "QUEUED": "PREPARING",
        "PREPARING": "READY",
        "READY": "DELIVERED",
    }

    def __init__(
        self,
        order_id: int,
        ticket_code: str,
        student_name: str,
        pickup_location: str,
        time_slot: str,
        payment_method: str,
        items: List[OrderItem],
        subtotal: float,
        final_amount: float,
        discount_amount: float,
        status: str,
        created_at: str,
        updated_at: str,
        estimated_wait_min: int,
        call_count: int = 0,
        was_delayed: bool = False,
    ) -> None:
        self._id = order_id
        self._ticket_code = ticket_code
        self._student_name = student_name.strip()
        self._pickup_location = (
            pickup_location
            if pickup_location in PICKUP_LOCATIONS
            else "BRUM"
        )
        self._time_slot = time_slot
        self._payment_method = payment_method
        self._items = list(items)
        self._subtotal = round(float(subtotal), 2)
        self._final_amount = round(float(final_amount), 2)
        self._discount_amount = round(float(discount_amount), 2)
        self._status = status
        self._created_at = created_at
        self._updated_at = updated_at
        self._estimated_wait_min = max(2, int(estimated_wait_min))
        self._call_count = max(0, int(call_count))
        self._was_delayed = bool(was_delayed)

    @property
    def id(self) -> int:
        return self._id

    @property
    def ticket_code(self) -> str:
        return self._ticket_code

    @property
    def status(self) -> str:
        return self._status

    @property
    def final_amount(self) -> float:
        return self._final_amount

    @property
    def time_slot(self) -> str:
        return self._time_slot

    @property
    def estimated_wait_min(self) -> int:
        return self._estimated_wait_min

    @property
    def call_count(self) -> int:
        return self._call_count

    @property
    def total_items_count(self) -> int:
        return sum(item.quantity for item in self._items)

    @property
    def is_active_in_kitchen(self) -> bool:
        return self._status in ("QUEUED", "PREPARING")

    def increment_call_count(self) -> int:
        """Bakery staff re-calls the student when food is ready at the counter."""
        self._call_count += 1
        self._updated_at = datetime.now().isoformat(timespec="seconds")
        return self._call_count

    def advance_status(self) -> str:
        """Encapsulated state transition."""
        if self._status not in self.STATUS_TRANSITIONS:
            raise ValueError(f"O pedido {self._ticket_code} já foi entregue.")
        self._status = self.STATUS_TRANSITIONS[self._status]
        self._updated_at = datetime.now().isoformat(timespec="seconds")
        return self._status

    def elapsed_minutes(self, now: datetime) -> int:
        try:
            created_dt = datetime.fromisoformat(self._created_at)
            delta = (now - created_dt).total_seconds() / 60.0
            return max(0, int(round(delta)))
        except Exception:
            return 0

    @property
    def was_delayed(self) -> bool:
        return self._was_delayed

    def is_delayed(self, now: datetime) -> bool:
        """
        Law of Demeter: Order directly answers whether it exceeded its SLA target
        without exposing internal location structures to external callers.
        """
        location_info = PICKUP_LOCATIONS.get(
            self._pickup_location, PICKUP_LOCATIONS["BRUM"]
        )
        sla_limit = max(location_info["target_sla_min"], self._estimated_wait_min)
        delayed = self.elapsed_minutes(now) > sla_limit and bool(self._created_at)
        if delayed:
            self._was_delayed = True
        if self._status not in ("QUEUED", "PREPARING"):
            return False
        return delayed

    def urgency_level(self, now: datetime) -> str:
        if self._status not in ("QUEUED", "PREPARING"):
            return "COMPLETED"
        elapsed = self.elapsed_minutes(now) if self._created_at else 0
        location_info = PICKUP_LOCATIONS.get(
            self._pickup_location, PICKUP_LOCATIONS["BRUM"]
        )
        sla_limit = max(location_info["target_sla_min"], self._estimated_wait_min)
        if elapsed > sla_limit:
            return "DELAYED"
        if elapsed >= sla_limit - 2:
            return "WARNING"
        return "ON_TIME"

    def to_dict(self, now: datetime) -> Dict[str, Any]:
        location_info = PICKUP_LOCATIONS.get(
            self._pickup_location, PICKUP_LOCATIONS["BRUM"]
        )
        elapsed = self.elapsed_minutes(now)
        sla_limit = max(location_info["target_sla_min"], self._estimated_wait_min)
        is_delayed = self.is_delayed(now)
        was_delayed = self._was_delayed or (elapsed > sla_limit)
        return {
            "id": self._id,
            "ticket_code": self._ticket_code,
            "student_name": self._student_name,
            "pickup_location": self._pickup_location,
            "location_name": location_info["name"],
            "location_floor": location_info["floor"],
            "time_slot": self._time_slot,
            "payment_method": self._payment_method,
            "items": [item.to_dict() for item in self._items],
            "total_items_count": self.total_items_count,
            "subtotal": self._subtotal,
            "final_amount": self._final_amount,
            "discount_amount": self._discount_amount,
            "status": self._status,
            "call_count": self._call_count,
            "created_at": self._created_at,
            "updated_at": self._updated_at,
            "estimated_wait_min": self._estimated_wait_min,
            "sla_limit_min": sla_limit,
            "elapsed_minutes": elapsed,
            "overdue_minutes": max(0, elapsed - sla_limit)
            if (self.is_active_in_kitchen or was_delayed)
            else 0,
            "is_delayed": is_delayed,
            "was_delayed": was_delayed,
            "urgency_level": self.urgency_level(now),
        }
