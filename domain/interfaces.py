"""
Chapter 5 Design Principles applied in this module:
1. Interface Segregation Principle (ISP):
   - Instead of a single bloated `CanteenRepository` interface, contracts are split by client role:
     `CatalogReader` (read-only menu queries), `InventoryManager` (staff stock & product creation),
     and `OrderRepository` (order persistence & hourly demand tracking).
2. Dependency Inversion Principle (DIP):
   - High-level domain services depend exclusively on these abstract base classes,
     never directly on low-level SQLite (`sqlite3`) details.
"""

from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from domain.entities import Product, Order


class CatalogReader(ABC):
    """Segregated read-only interface for menu queries (ISP)."""

    @abstractmethod
    def list_products(self) -> List[Product]:
        pass

    @abstractmethod
    def find_product(self, product_id: int) -> Optional[Product]:
        pass


class InventoryManager(CatalogReader, ABC):
    """Segregated interface for bakery staff inventory control and product creation (ISP)."""

    @abstractmethod
    def create_product(
        self,
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
    ) -> Product:
        pass

    @abstractmethod
    def save_stock(self, product_id: int, new_stock: int) -> Product:
        pass


class OrderRepository(ABC):
    """Abstraction for order persistence and hourly demand statistics (DIP)."""

    @abstractmethod
    def save_order(self, order: Order) -> Order:
        pass

    @abstractmethod
    def list_orders(self) -> List[Order]:
        pass

    @abstractmethod
    def find_order(self, order_id: int) -> Optional[Order]:
        pass

    @abstractmethod
    def update_order_status(
        self, order_id: int, new_status: str, updated_at: str
    ) -> Order:
        pass

    @abstractmethod
    def re_notify_order(self, order_id: int) -> Order:
        pass

    @abstractmethod
    def get_hourly_demand(self) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def increment_hourly_actual(self, time_slot: str) -> None:
        pass


class PaymentStrategy(ABC):
    """
    Abstract contract for payment methods (Open/Closed Principle - OCP & Liskov Substitution - LSP).
    New payment or discount rules can be added by creating a new subclass without modifying `OrderService`.
    """

    @abstractmethod
    def code(self) -> str:
        pass

    @abstractmethod
    def display_name(self) -> str:
        pass

    @abstractmethod
    def short_description(self) -> str:
        pass

    @abstractmethod
    def calculate_final_amount(self, subtotal: float) -> float:
        pass


class QueueSlaCalculator(ABC):
    """
    Contract for Composition over Inheritance:
    Allows swapping the queue wait-time algorithm without subclassing domain services.
    """

    @abstractmethod
    def estimate_wait_minutes(
        self, active_orders: List[Order], items_prep_time_min: int
    ) -> int:
        pass
