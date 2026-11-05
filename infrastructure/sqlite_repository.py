"""
SQLite Infrastructure Adapter (`SqliteCanteenRepository`).
Implements `InventoryManager` and `OrderRepository` defined in `domain/interfaces.py`.
Demonstrates the Dependency Inversion Principle (DIP): low-level database details depend on
high-level domain abstractions, never the reverse.
"""

import sqlite3
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from domain.entities import Product, Order, OrderItem
from domain.interfaces import InventoryManager, OrderRepository


class SqliteCanteenRepository(InventoryManager, OrderRepository):
    """Concrete SQLite adapter implementing the segregated domain interfaces."""

    def __init__(self, db_path: str) -> None:
        self._db_path = db_path
        self._initialize_schema_and_seed()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self._db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _initialize_schema_and_seed(self) -> None:
        with self._connect() as conn:
            cursor = conn.cursor()
            cursor.executescript(
                """
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    category TEXT NOT NULL,
                    price REAL NOT NULL,
                    prep_time_min INTEGER NOT NULL,
                    stock INTEGER NOT NULL,
                    image_url TEXT NOT NULL DEFAULT '/static/images/coxinha.jpg',
                    badge TEXT DEFAULT '',
                    description TEXT DEFAULT '',
                    ingredients TEXT DEFAULT '',
                    icon TEXT DEFAULT '🍗'
                );

                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ticket_code TEXT NOT NULL,
                    student_name TEXT NOT NULL,
                    pickup_location TEXT NOT NULL,
                    time_slot TEXT NOT NULL,
                    payment_method TEXT NOT NULL,
                    subtotal REAL NOT NULL,
                    final_amount REAL NOT NULL,
                    discount_amount REAL NOT NULL,
                    status TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    estimated_wait_min INTEGER NOT NULL,
                    call_count INTEGER NOT NULL DEFAULT 0,
                    was_delayed INTEGER NOT NULL DEFAULT 0
                );

                CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    product_name TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    unit_price REAL NOT NULL,
                    prep_time_min INTEGER NOT NULL,
                    image_url TEXT NOT NULL DEFAULT '/static/images/coxinha.jpg',
                    FOREIGN KEY(order_id) REFERENCES orders(id)
                );

                CREATE TABLE IF NOT EXISTS hourly_demand (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time_slot TEXT UNIQUE NOT NULL,
                    label TEXT NOT NULL,
                    forecast_orders INTEGER NOT NULL,
                    actual_orders INTEGER NOT NULL
                );
                """
            )

            for alter_sql in [
                "ALTER TABLE orders ADD COLUMN call_count INTEGER NOT NULL DEFAULT 0",
                "ALTER TABLE orders ADD COLUMN was_delayed INTEGER NOT NULL DEFAULT 0",
                "ALTER TABLE products ADD COLUMN description TEXT DEFAULT ''",
                "ALTER TABLE products ADD COLUMN ingredients TEXT DEFAULT ''",
                "ALTER TABLE products ADD COLUMN icon TEXT DEFAULT '🍗'",
            ]:
                try:
                    cursor.execute(alter_sql)
                except sqlite3.OperationalError:
                    pass

            product_count = cursor.execute(
                "SELECT COUNT(*) FROM products"
            ).fetchone()[0]
            if product_count == 0:
                self._seed_initial_data(cursor)
            conn.commit()

    def _seed_initial_data(self, cursor: sqlite3.Cursor) -> None:
        initial_products = [
            (
                "Coxinha de frango",
                "Salgados & Forno",
                6.50,
                2,
                16,
                "/static/images/coxinha.jpg",
                "Mais pedido",
                "Massa artesanal de batata e caldo de frango, recheada com peito de frango desfiado temperado com ervas e Catupiry legítimo. Aquecida no ciclo de 2 min.",
                "Peito de frango, Catupiry original, farinha de trigo, batata, cheiro-verde.",
                "🍗",
            ),
            (
                "Pão de queijo",
                "Salgados & Forno",
                4.00,
                2,
                24,
                "/static/images/pao_de_queijo.jpg",
                "Combo do dia",
                "Pão de queijo mineiro quentinho com queijo canastra curado, casquinha dourada crocante e miolo macio.",
                "Polvilho artesanal, queijo meia cura, leite integral, ovos, manteiga.",
                "🧀",
            ),
            (
                "Café especial",
                "Bebidas",
                5.00,
                1,
                30,
                "/static/images/cafe_expresso.jpg",
                "Combo do dia",
                "Café expresso especial CESAR moído na hora, grãos 100% arábica com notas de caramelo e chocolate.",
                "Grãos selecionados de café 100% arábica.",
                "☕",
            ),
            (
                "Suco natural",
                "Bebidas",
                7.00,
                2,
                14,
                "/static/images/suco_laranja.jpg",
                "100% Integral",
                "Suco natural de laranja 350ml espremido na hora, sem adição de açúcar ou conservantes.",
                "100% Suco de laranja natural gelado.",
                "🧃",
            ),
            (
                "Almoço do Dia · Executivo Grelhado",
                "Almoço do Dia",
                16.90,
                4,
                10,
                "/static/images/empada.jpg",
                "Turno Almoço",
                "Opção completa de almoço rápido entre turnos (Persona Rafael): filé de frango grelhado, arroz soltinho, feijão caseiro e salada fresca.",
                "Filé de peito de frango, arroz branco, feijão carioca, mix de folhas e tomate cereja.",
                "🍱",
            ),
            (
                "Empada Artesanal de Frango (Almoço Leve)",
                "Almoço do Dia",
                8.50,
                2,
                12,
                "/static/images/empada.jpg",
                "Turno Almoço",
                "Empada grande de massa podre que derrete na boca com recheio cremoso de frango e palmito.",
                "Farinha de trigo, manteiga, peito de frango, palmito, azeitona, requeijão.",
                "🥧",
            ),
            (
                "Croissant Francês Folhado",
                "Salgados & Forno",
                11.90,
                3,
                8,
                "/static/images/croissant.jpg",
                "Manteiga Especial",
                "Folhado clássico leve e crocante preparado com manteiga extra e recheio de queijo e presunto.",
                "Farinha de trigo especial, manteiga sem sal, queijo prato, presunto magro.",
                "🥐",
            ),
            (
                "Risole de Presunto e Queijo",
                "Salgados & Forno",
                7.50,
                2,
                12,
                "/static/images/risole.jpg",
                "Fornada Quente",
                "Massa macia e dourada com casquinha crocante, recheada com presunto e mussarela derretida.",
                "Presunto, queijo mussarela, farinha de trigo, leite integral, manteiga.",
                "🥟",
            ),
            (
                "Bolo de Chocolate Belga",
                "Doces & Bolos",
                9.50,
                1,
                9,
                "/static/images/bolo_chocolate.jpg",
                "Cobertura Cremosa",
                "Fatia generosa de bolo úmido de cacau 70% com cobertura de ganache de chocolate belga.",
                "Cacau 70%, chocolate belga, farinha de trigo, ovos, manteiga.",
                "🍫",
            ),
            (
                "Bolo de Cenoura com Calda",
                "Doces & Bolos",
                8.50,
                1,
                12,
                "/static/images/bolo_cenoura.jpg",
                "Artesanal",
                "Clássico bolo fofinho de cenoura fresca com cobertura crocante de brigadeiro.",
                "Cenoura fresca, farinha de trigo, ovos, chocolate meio amargo.",
                "🥕",
            ),
            (
                "Coca-Cola Zero 350ml",
                "Bebidas",
                6.00,
                1,
                18,
                "/static/images/coca_zero.jpg",
                "Super Gelada",
                "Lata 350ml trincando de gelada para acompanhar seu salgado no intervalo.",
                "Água gaseificada, extrato de noz de cola, zero açúcar.",
                "🥤",
            ),
            (
                "Água Mineral 500ml",
                "Bebidas",
                4.00,
                1,
                25,
                "/static/images/agua_mineral.jpg",
                "Gelada",
                "Água mineral natural sem gás, servida gelada no balcão.",
                "100% Água mineral natural de fonte.",
                "💧",
            ),
        ]
        cursor.executemany(
            """
            INSERT INTO products (name, category, price, prep_time_min, stock, image_url, badge, description, ingredients, icon)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            initial_products,
        )

        hourly_slots = [
            ("08:00", "08:00 · Entrada Manhã", 10, 9),
            ("09:45", "09:45 · Intervalo Manhã (Pico)", 26, 22),
            ("11:30", "11:30 · Almoço do Dia (Rafael)", 18, 15),
            ("14:00", "14:00 · Início Tarde", 10, 9),
            ("15:45", "15:45 · Intervalo Tarde (Pico)", 28, 21),
            ("18:30", "18:30 · Intervalo Noite", 16, 8),
        ]
        cursor.executemany(
            """
            INSERT INTO hourly_demand (time_slot, label, forecast_orders, actual_orders)
            VALUES (?, ?, ?, ?)
            """,
            hourly_slots,
        )

        now = datetime.now()
        t_minus_22 = (now - timedelta(minutes=22)).isoformat(timespec="seconds")
        t_minus_15 = (now - timedelta(minutes=15)).isoformat(timespec="seconds")
        t_minus_6 = (now - timedelta(minutes=6)).isoformat(timespec="seconds")
        t_minus_4 = (now - timedelta(minutes=4)).isoformat(timespec="seconds")
        t_minus_2 = (now - timedelta(minutes=2)).isoformat(timespec="seconds")

        # 4 initial orders (PS-101 to PS-104) so that the very next order placed by the user is PS-105!
        seed_orders = [
            (
                "PS-101",
                "Mariana (Design · 4º período)",
                "APOLO",
                "09:45",
                "Pix + Cupom Combo do Dia (15% OFF)",
                9.00,
                7.65,
                1.35,
                "DELIVERED",
                t_minus_22,
                t_minus_15,
                4,
                [
                    (2, "Pão de queijo", 1, 4.00, 2, "/static/images/pao_de_queijo.jpg"),
                    (3, "Café especial", 1, 5.00, 1, "/static/images/cafe_expresso.jpg"),
                ],
            ),
            (
                "PS-102",
                "Beatriz Melo (Eng. Soft)",
                "TIRADENTES",
                "15:45",
                "Pagar agora com Pix",
                13.50,
                13.50,
                0.00,
                "READY",
                t_minus_6,
                t_minus_2,
                6,
                [
                    (1, "Coxinha de frango", 1, 6.50, 2, "/static/images/coxinha.jpg"),
                    (4, "Suco natural", 1, 7.00, 2, "/static/images/suco_laranja.jpg"),
                ],
            ),
            (
                "PS-103",
                "Rafael (Eng. Soft · 5º período)",
                "TIRADENTES",
                "11:30",
                "Pagar agora com Pix",
                16.90,
                16.90,
                0.00,
                "PREPARING",
                t_minus_4,
                t_minus_2,
                6,
                [
                    (5, "Almoço do Dia · Executivo Grelhado", 1, 16.90, 4, "/static/images/empada.jpg"),
                ],
            ),
            (
                "PS-104",
                "Camila Rocha (IA)",
                "BRUM",
                "15:45",
                "Pagar agora com Pix",
                11.50,
                11.50,
                0.00,
                "QUEUED",
                t_minus_2,
                t_minus_2,
                8,
                [
                    (1, "Coxinha de frango", 1, 6.50, 2, "/static/images/coxinha.jpg"),
                    (3, "Café especial", 1, 5.00, 1, "/static/images/cafe_expresso.jpg"),
                ],
            ),
        ]

        for (
            ticket,
            student,
            loc,
            slot,
            pay,
            sub,
            final,
            disc,
            st,
            c_at,
            u_at,
            est,
            items,
        ) in seed_orders:
            cursor.execute(
                """
                INSERT INTO orders (
                    ticket_code, student_name, pickup_location, time_slot, payment_method,
                    subtotal, final_amount, discount_amount, status, created_at, updated_at, estimated_wait_min
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (ticket, student, loc, slot, pay, sub, final, disc, st, c_at, u_at, est),
            )
            oid = cursor.lastrowid
            for pid, pname, qty, uprice, ptime, img in items:
                cursor.execute(
                    """
                    INSERT INTO order_items (
                        order_id, product_id, product_name, quantity, unit_price, prep_time_min, image_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (oid, pid, pname, qty, uprice, ptime, img),
                )

    def reset_demo_database(self) -> None:
        with self._connect() as conn:
            cursor = conn.cursor()
            cursor.executescript(
                """
                DELETE FROM order_items;
                DELETE FROM orders;
                DELETE FROM products;
                DELETE FROM hourly_demand;
                """
            )
            self._seed_initial_data(cursor)
            conn.commit()

    def list_products(self) -> List[Product]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT * FROM products ORDER BY id ASC"
            ).fetchall()
            return [self._row_to_product(r) for r in rows]

    def find_product(self, product_id: int) -> Optional[Product]:
        with self._connect() as conn:
            row = conn.execute(
                "SELECT * FROM products WHERE id = ?", (product_id,)
            ).fetchone()
            return self._row_to_product(row) if row else None

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
        temp_product = Product(
            product_id=0,
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
        with self._connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO products (name, category, price, prep_time_min, stock, image_url, badge, description, ingredients, icon)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    temp_product.name,
                    temp_product.category,
                    temp_product.price,
                    temp_product.prep_time_min,
                    temp_product.stock,
                    temp_product.image_url,
                    badge,
                    description,
                    ingredients,
                    temp_product.icon,
                ),
            )
            new_id = cursor.lastrowid
            conn.commit()
        return self.find_product(int(new_id))  # type: ignore

    def save_stock(self, product_id: int, new_stock: int) -> Product:
        product = self.find_product(product_id)
        if not product:
            raise ValueError(f"Produto #{product_id} não encontrado.")
        product.update_stock(new_stock)
        with self._connect() as conn:
            conn.execute(
                "UPDATE products SET stock = ? WHERE id = ?",
                (product.stock, product_id),
            )
            conn.commit()
        return product

    def save_order(self, order: Order) -> Order:
        snapshot = order.to_dict(datetime.now())
        with self._connect() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO orders (
                    ticket_code, student_name, pickup_location, time_slot, payment_method,
                    subtotal, final_amount, discount_amount, status, created_at, updated_at, estimated_wait_min,
                    call_count, was_delayed
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    snapshot["ticket_code"],
                    snapshot["student_name"],
                    snapshot["pickup_location"],
                    snapshot["time_slot"],
                    snapshot["payment_method"],
                    snapshot["subtotal"],
                    snapshot["final_amount"],
                    snapshot["discount_amount"],
                    snapshot["status"],
                    snapshot["created_at"],
                    snapshot["updated_at"],
                    snapshot["estimated_wait_min"],
                    snapshot.get("call_count", 0),
                    1 if snapshot.get("was_delayed") else 0,
                ),
            )
            new_order_id = int(cursor.lastrowid)
            for item in snapshot["items"]:
                cursor.execute(
                    """
                    INSERT INTO order_items (
                        order_id, product_id, product_name, quantity, unit_price, prep_time_min, image_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        new_order_id,
                        item["product_id"],
                        item["product_name"],
                        item["quantity"],
                        item["unit_price"],
                        item["prep_time_min"],
                        item["image_url"],
                    ),
                )
            conn.commit()
        return self.find_order(new_order_id)  # type: ignore

    def list_orders(self) -> List[Order]:
        with self._connect() as conn:
            order_rows = conn.execute(
                "SELECT * FROM orders ORDER BY id DESC"
            ).fetchall()
            result: List[Order] = []
            for o_row in order_rows:
                item_rows = conn.execute(
                    "SELECT * FROM order_items WHERE order_id = ?", (o_row["id"],)
                ).fetchall()
                result.append(self._row_to_order(o_row, item_rows))
            return result

    def find_order(self, order_id: int) -> Optional[Order]:
        with self._connect() as conn:
            o_row = conn.execute(
                "SELECT * FROM orders WHERE id = ?", (order_id,)
            ).fetchone()
            if not o_row:
                return None
            item_rows = conn.execute(
                "SELECT * FROM order_items WHERE order_id = ?", (order_id,)
            ).fetchall()
            return self._row_to_order(o_row, item_rows)

    def update_order_status(
        self, order_id: int, new_status: str, updated_at: str
    ) -> Order:
        order = self.find_order(order_id)
        was_delayed = (
            1
            if (order and (order.was_delayed or order.is_delayed(datetime.now())))
            else 0
        )
        with self._connect() as conn:
            conn.execute(
                "UPDATE orders SET status = ?, updated_at = ?, was_delayed = MAX(was_delayed, ?) WHERE id = ?",
                (new_status, updated_at, was_delayed, order_id),
            )
            conn.commit()
        return self.find_order(order_id)  # type: ignore

    def re_notify_order(self, order_id: int) -> Order:
        with self._connect() as conn:
            conn.execute(
                """
                UPDATE orders
                SET call_count = call_count + 1, updated_at = ?
                WHERE id = ?
                """,
                (datetime.now().isoformat(timespec="seconds"), order_id),
            )
            conn.commit()
        return self.find_order(order_id)  # type: ignore

    def get_hourly_demand(self) -> List[Dict[str, Any]]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT * FROM hourly_demand ORDER BY id ASC"
            ).fetchall()
            return [
                {
                    "time_slot": r["time_slot"],
                    "label": r["label"],
                    "forecast_orders": r["forecast_orders"],
                    "actual_orders": r["actual_orders"],
                }
                for r in rows
            ]

    def increment_hourly_actual(self, time_slot: str) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                UPDATE hourly_demand
                SET actual_orders = actual_orders + 1
                WHERE time_slot = ?
                """,
                (time_slot,),
            )
            conn.commit()

    @staticmethod
    def _row_to_product(row: sqlite3.Row) -> Product:
        keys = row.keys()
        return Product(
            product_id=row["id"],
            name=row["name"],
            category=row["category"],
            price=row["price"],
            prep_time_min=row["prep_time_min"],
            stock=row["stock"],
            image_url=row["image_url"]
            if "image_url" in keys
            else "/static/images/coxinha.jpg",
            badge=row["badge"] or "",
            description=row["description"] if "description" in keys else "",
            ingredients=row["ingredients"] if "ingredients" in keys else "",
            icon=row["icon"] if "icon" in keys else "🍗",
        )

    @staticmethod
    def _row_to_order(
        order_row: sqlite3.Row, item_rows: List[sqlite3.Row]
    ) -> Order:
        items = [
            OrderItem(
                product_id=ir["product_id"],
                product_name=ir["product_name"],
                quantity=ir["quantity"],
                unit_price=ir["unit_price"],
                prep_time_min=ir["prep_time_min"],
                image_url=ir["image_url"]
                if "image_url" in ir.keys()
                else "/static/images/coxinha.jpg",
            )
            for ir in item_rows
        ]
        keys = order_row.keys()
        return Order(
            order_id=order_row["id"],
            ticket_code=order_row["ticket_code"],
            student_name=order_row["student_name"],
            pickup_location=order_row["pickup_location"],
            time_slot=order_row["time_slot"],
            payment_method=order_row["payment_method"],
            items=items,
            subtotal=order_row["subtotal"],
            final_amount=order_row["final_amount"],
            discount_amount=order_row["discount_amount"],
            status=order_row["status"],
            created_at=order_row["created_at"],
            updated_at=order_row["updated_at"],
            estimated_wait_min=order_row["estimated_wait_min"],
            call_count=order_row["call_count"] if "call_count" in keys else 0,
            was_delayed=bool(order_row["was_delayed"])
            if "was_delayed" in keys
            else False,
        )
