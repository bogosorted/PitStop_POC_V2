"""
Chapter 5 Design Principles applied in this module:
1. Open/Closed Principle (OCP):
   - Billing and discount calculation is closed for modification inside `OrderService`,
     but open for extension by adding new subclasses of `PaymentStrategy`.
2. Liskov Substitution Principle (LSP):
   - Every `PaymentStrategy` implementation honors the base contract postcondition:
     `0 <= calculate_final_amount(subtotal) <= subtotal`.
3. Favor Composition over Inheritance:
   - `SmartQueueCalculator` models the real physical canteen capacity from the Personas study
     (4 snacks per 2-minute heating cycle per machine, 2 attendants) and is injected as a collaborator.
"""

from typing import Dict, List
from domain.entities import Order
from domain.interfaces import PaymentStrategy, QueueSlaCalculator


class InstantPixPayment(PaymentStrategy):
    def code(self) -> str:
        return "PIX"

    def display_name(self) -> str:
        return "Pagar agora com Pix"

    def short_description(self) -> str:
        return "Só mostrar a senha e retirar"

    def calculate_final_amount(self, subtotal: float) -> float:
        return round(max(0.0, subtotal), 2)


class PayOnPickupPayment(PaymentStrategy):
    def code(self) -> str:
        return "BALCAO"

    def display_name(self) -> str:
        return "Pagar na retirada"

    def short_description(self) -> str:
        return "Na maquininha do balcão"

    def calculate_final_amount(self, subtotal: float) -> float:
        return round(max(0.0, subtotal), 2)


class DailyComboDiscountPayment(PaymentStrategy):
    """
    OCP Strategy for the 'Combo do Dia' & Active Student Coupon (Mariana persona):
    Applies 15% discount when activated by the student in the 'Descontos' screen.
    """

    def code(self) -> str:
        return "COMBO_DIA"

    def display_name(self) -> str:
        return "Pix + Cupom Combo do Dia (15% OFF)"

    def short_description(self) -> str:
        return "Desconto estudantil ativo na carteira de cupons"

    def calculate_final_amount(self, subtotal: float) -> float:
        return round(max(0.0, subtotal * 0.85), 2)


class PitStopWalletPayment(PaymentStrategy):
    def code(self) -> str:
        return "PITSTOP_WALLET"

    def display_name(self) -> str:
        return "Saldo PitStop CESAR (5% OFF)"

    def short_description(self) -> str:
        return "Carteira digital do aluno com 5% de desconto"

    def calculate_final_amount(self, subtotal: float) -> float:
        return round(max(0.0, subtotal * 0.95), 2)


class ResidencyVoucherPayment(PaymentStrategy):
    """
    LIVE PROOF OF THE OPEN/CLOSED PRINCIPLE (OCP):
    Added by creating ONLY this new class and registering it in the strategy map,
    with ZERO modifications to `OrderService`!
    """

    def code(self) -> str:
        return "RESIDENCY_VOUCHER"

    def display_name(self) -> str:
        return "Voucher Monitoria / Residência (12% OFF)"

    def short_description(self) -> str:
        return "Benefício estudantil CESAR School"

    def calculate_final_amount(self, subtotal: float) -> float:
        return round(max(0.0, subtotal * 0.88), 2)


class SmartQueueCalculator(QueueSlaCalculator):
    """
    Estimates wait time based on the real physical capacity documented in the Personas study:
    - Each machine heats ~4 snacks per 2-minute cycle (`snacks_per_cycle = 4`, `cycle_minutes = 2`).
    - 2 attendants (Patrícia + 1) handle assembly and counter handoff.
    """

    def __init__(
        self,
        parallel_stations: int = 2,
        snacks_per_cycle: int = 4,
        cycle_minutes: int = 2,
    ) -> None:
        self._stations = max(1, parallel_stations)
        self._snacks_per_cycle = max(1, snacks_per_cycle)
        self._cycle_minutes = max(1, cycle_minutes)

    def estimate_wait_minutes(
        self, active_orders: List[Order], items_prep_time_min: int
    ) -> int:
        active_items = sum(
            order.total_items_count
            for order in active_orders
            if order.is_active_in_kitchen
        )
        batch_capacity = self._stations * self._snacks_per_cycle
        cycles_needed = (active_items + batch_capacity - 1) // batch_capacity
        oven_queue_minutes = cycles_needed * self._cycle_minutes
        return max(2, int(items_prep_time_min + oven_queue_minutes))


def build_payment_registry() -> Dict[str, PaymentStrategy]:
    strategies: List[PaymentStrategy] = [
        InstantPixPayment(),
        PayOnPickupPayment(),
        DailyComboDiscountPayment(),
        PitStopWalletPayment(),
        ResidencyVoucherPayment(),
    ]
    return {strategy.code(): strategy for strategy in strategies}
