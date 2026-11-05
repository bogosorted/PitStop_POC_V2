#!/usr/bin/env python3
"""
PitStop V2 — CESAR School 15-Minute Break Canteen System.
Entry point and HTTP JSON API Server using Python's built-in `http.server` and `sqlite3`.
All code identifiers follow strict English conventions (Conceptual Integrity).
"""

import json
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from typing import Dict, Any, List
from urllib.parse import urlparse

from domain.entities import SupportTicket
from domain.strategies import build_payment_registry, SmartQueueCalculator
from domain.services import InventoryService, OrderService, LiveMetricsEngine
from domain.code_metrics import build_chapter5_report
from infrastructure.sqlite_repository import SqliteCanteenRepository


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "pitstop.db"
STATIC_DIR = BASE_DIR / "static"


class ApplicationContainer:
    """
    Dependency Injection Container applying Information Hiding & Law of Demeter:
    Internal adapters and services are private (`_repository`, `_order_service`, etc.),
    exposing only cohesive high-level operations to the HTTP adapter.
    """

    def __init__(self, db_path: Path) -> None:
        self._repository = SqliteCanteenRepository(str(db_path))
        self._payment_registry = build_payment_registry()
        self._queue_calculator = SmartQueueCalculator(
            parallel_stations=2, snacks_per_cycle=4, cycle_minutes=2
        )

        self._inventory_service = InventoryService(self._repository)
        self._order_service = OrderService(
            inventory_manager=self._repository,
            order_repository=self._repository,
            payment_strategies=self._payment_registry,
            queue_calculator=self._queue_calculator,
        )
        self._metrics_engine = LiveMetricsEngine(
            inventory_manager=self._repository,
            order_repository=self._repository,
            queue_calculator=self._queue_calculator,
        )
        self._support_tickets: List[SupportTicket] = []

    def place_order(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._order_service.place_order(payload)

    def advance_order_stage(self, order_id: int) -> Dict[str, Any]:
        return self._order_service.advance_order_stage(order_id)

    def re_notify_order(self, order_id: int) -> Dict[str, Any]:
        return self._order_service.re_notify_order(order_id)

    def register_product(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._inventory_service.register_product(payload)

    def adjust_stock(self, product_id: int, new_stock: int) -> Dict[str, Any]:
        return self._inventory_service.adjust_stock(product_id, new_stock)

    def create_support_ticket(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        ticket = SupportTicket(
            ticket_id=len(self._support_tickets) + 1,
            student_name=str(payload.get("student_name", "Aluno CESAR")),
            pickup_location=str(payload.get("pickup_location", "BRUM")),
            topic=str(payload.get("topic", "Ajuda com Pedido")),
            message=str(payload.get("message", "Solicitou atendimento da Patrícia.")),
        )
        self._support_tickets.insert(0, ticket)
        return ticket.to_dict()

    def resolve_support_ticket(self, ticket_id: int) -> None:
        for ticket in self._support_tickets:
            if ticket.id == ticket_id:
                ticket.resolve()

    def reset_demo_database(self) -> None:
        self._repository.reset_demo_database()
        self._support_tickets.clear()

    def get_full_state(self) -> Dict[str, Any]:
        dashboard = self._metrics_engine.build_live_dashboard()
        dashboard["support_tickets"] = [
            t.to_dict() for t in self._support_tickets if t.is_open
        ]
        catalog = self._inventory_service.list_catalog()
        allowed_methods = [
            "PIX",
            "CARTAO",
            "COMBO_DIA",
            "PITSTOP_WALLET",
            "RESIDENCY_VOUCHER",
        ]
        payment_methods = [
            {
                "code": self._payment_registry[code].code(),
                "name": self._payment_registry[code].display_name(),
                "description": self._payment_registry[code].short_description(),
            }
            for code in allowed_methods
            if code in self._payment_registry
        ]
        return {
            "catalog": catalog,
            "dashboard": dashboard,
            "payment_methods": payment_methods,
            "chapter5": build_chapter5_report(BASE_DIR),
        }


CONTAINER = ApplicationContainer(DB_PATH)


class PitStopHttpHandler(BaseHTTPRequestHandler):
    """Lightweight HTTP controller delegating all business rules to domain services."""

    def log_message(self, format_str: str, *args: Any) -> None:
        pass

    def _send_json(self, status_code: int, payload: Dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _serve_static_file(self, file_path: Path) -> None:
        if not file_path.exists() or not file_path.is_file():
            self._send_json(404, {"error": "Arquivo não encontrado."})
            return
        mime_type, _ = mimetypes.guess_type(str(file_path))
        content = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mime_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def _read_json_body(self) -> Dict[str, Any]:
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0:
            return {}
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw) if raw else {}

    def do_HEAD(self) -> None:
        self.do_GET()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        route = parsed.path

        if route == "/api/state":
            self._send_json(200, CONTAINER.get_full_state())
            return

        if route == "/api/chapter5":
            self._send_json(200, build_chapter5_report(BASE_DIR))
            return

        if route == "/" or route == "/index.html":
            self._serve_static_file(STATIC_DIR / "index.html")
            return

        if route.startswith("/static/"):
            rel_path = route.replace("/static/", "", 1)
            self._serve_static_file(STATIC_DIR / rel_path)
            return

        self._serve_static_file(STATIC_DIR / "index.html")

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        route = parsed.path

        try:
            body = self._read_json_body()

            if route == "/api/orders":
                created_order = CONTAINER.place_order(body)
                self._send_json(
                    201,
                    {
                        "order": created_order,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/orders/advance":
                order_id = int(body.get("order_id", 0))
                updated_order = CONTAINER.advance_order_stage(order_id)
                self._send_json(
                    200,
                    {
                        "order": updated_order,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/orders/re-notify":
                order_id = int(body.get("order_id", 0))
                updated_order = CONTAINER.re_notify_order(order_id)
                self._send_json(
                    200,
                    {
                        "order": updated_order,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/products":
                created_product = CONTAINER.register_product(body)
                self._send_json(
                    201,
                    {
                        "product": created_product,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/products/stock":
                product_id = int(body.get("product_id", 0))
                new_stock = int(body.get("new_stock", 0))
                updated_product = CONTAINER.adjust_stock(product_id, new_stock)
                self._send_json(
                    200,
                    {
                        "product": updated_product,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/support":
                ticket = CONTAINER.create_support_ticket(body)
                self._send_json(
                    201,
                    {
                        "ticket": ticket,
                        "state": CONTAINER.get_full_state(),
                    },
                )
                return

            if route == "/api/support/resolve":
                ticket_id = int(body.get("ticket_id", 0))
                CONTAINER.resolve_support_ticket(ticket_id)
                self._send_json(200, {"state": CONTAINER.get_full_state()})
                return

            if route == "/api/reset":
                CONTAINER.reset_demo_database()
                self._send_json(200, {"state": CONTAINER.get_full_state()})
                return

            self._send_json(404, {"error": "Endpoint não encontrado."})

        except ValueError as err:
            self._send_json(400, {"error": str(err)})
        except Exception as err:
            self._send_json(500, {"error": f"Erro interno: {err}"})


def run_server(port: int = 8080) -> None:
    server = HTTPServer(("0.0.0.0", port), PitStopHttpHandler)
    print(f"⚡ PitStop V2 CESAR rodando em: http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run_server(8080)
