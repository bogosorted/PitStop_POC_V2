"""
Chapter 5.7 Software Design Metrics Calculator & Before/After Analyzer.
Computes real static analysis metrics using Python's `ast` module:
- LOC (Lines of Code)
- LCOM (Lack of Cohesion of Methods: pairs of methods not sharing instance attributes)
- CBO (Coupling Between Objects: distinct external classes/modules referenced)
- Cyclomatic Complexity (McCabe: 1 + decision branches `if`, `for`, `while`, `and`, `or`, `except`)
"""

import ast
from pathlib import Path
from typing import Dict, Any, List, Set


GO_HORSE_GOD_CLASS_SNIPPET = """class CanteenGodManager:
    # ANTI-EXAMPLE (Go-Horse / Before Refactoring):
    # Violates SRP, OCP, DIP, Information Hiding, and has high LCOM & Cyclomatic Complexity.
    def __init__(self, db_file):
        self.db_file = db_file
        self.tax_rate = 0.0
        self.smtp_server = "smtp.cesar.school"
        self.sound_volume = 80

    def process_order_and_pay_and_sql(self, student, items, payment_type, floor):
        import sqlite3
        conn = sqlite3.connect(self.db_file)
        total = 0
        for item in items:
            # Direct public mutation without encapsulation + SQL inside business logic
            row = conn.execute(f"SELECT price, stock FROM products WHERE id={item['id']}").fetchone()
            if row[1] <= 0:
                return {"error": "Em falta"}
            conn.execute(f"UPDATE products SET stock = {row[1] - item['qty']} WHERE id={item['id']}")
            total += row[0] * item["qty"]
        # Violates Open/Closed Principle (giant if/elif chain for payments)
        if payment_type == "PIX":
            final = total
        elif payment_type == "CARD":
            final = total * 1.02
        elif payment_type == "WALLET":
            final = total * 0.95
        elif payment_type == "VOUCHER":
            final = total * 0.88
        else:
            final = total
        conn.commit()
        return {"total": final}

    def render_sound_alert(self, freq):
        return f"Beep {freq}Hz at volume {self.sound_volume}"

    def send_email_report(self, target):
        return f"Connecting to {self.smtp_server} for {target}"
"""


def compute_class_metrics(source_code: str, class_name: str) -> Dict[str, Any]:
    tree = ast.parse(source_code)
    target_node = None
    for node in ast.walk(tree):
        if isinstance(node, ast.ClassDef) and node.name == class_name:
            target_node = node
            break

    if target_node is None:
        return {"class_name": class_name, "loc": 0, "lcom": 0, "cbo": 0, "max_cc": 1}

    loc = (target_node.end_lineno or target_node.lineno) - target_node.lineno + 1

    methods_attrs: List[Set[str]] = []
    max_cc = 1
    coupled_types: Set[str] = set()

    ignored_names = {
        "Dict", "Any", "List", "Optional", "Set", "ValueError", "Exception",
        "ABC", "True", "False", "None",
    }

    for item in target_node.body:
        if isinstance(item, ast.FunctionDef):
            is_dunder = item.name.startswith("__") and item.name.endswith("__")
            is_accessor = any(
                isinstance(d, ast.Name) and d.id in ("property", "staticmethod")
                for d in item.decorator_list
            )
            cc = 1
            attrs_used: Set[str] = set()
            for sub in ast.walk(item):
                if (
                    isinstance(sub, ast.Attribute)
                    and isinstance(sub.value, ast.Name)
                    and sub.value.id == "self"
                ):
                    attrs_used.add(sub.attr)
                if isinstance(sub, (ast.If, ast.For, ast.While, ast.IfExp, ast.ExceptHandler)):
                    cc += 1
                elif isinstance(sub, ast.comprehension):
                    cc += len(sub.ifs)
                elif isinstance(sub, ast.BoolOp):
                    cc += len(sub.values) - 1
                elif isinstance(sub, ast.Import):
                    for alias in sub.names:
                        coupled_types.add(alias.name)
            max_cc = max(max_cc, cc)
            if not is_dunder and not is_accessor:
                methods_attrs.append(attrs_used)

    for sub in ast.walk(target_node):
        if (
            isinstance(sub, ast.Name)
            and sub.id[0].isupper()
            and sub.id != class_name
            and sub.id not in ignored_names
            and not sub.id.isupper()
        ):
            coupled_types.add(sub.id)

    disjoint_pairs = 0
    shared_pairs = 0
    n = len(methods_attrs)
    for i in range(n):
        for j in range(i + 1, n):
            if methods_attrs[i].intersection(methods_attrs[j]):
                shared_pairs += 1
            else:
                disjoint_pairs += 1

    lcom = max(0, disjoint_pairs - shared_pairs)

    return {
        "class_name": class_name,
        "loc": loc,
        "methods_count": n,
        "lcom": lcom,
        "cbo": len(coupled_types),
        "max_cyclomatic_complexity": max_cc,
    }


def build_chapter5_report(base_dir: Path) -> Dict[str, Any]:
    entities_src = (base_dir / "domain" / "entities.py").read_text(encoding="utf-8")
    services_src = (base_dir / "domain" / "services.py").read_text(encoding="utf-8")
    strategies_src = (base_dir / "domain" / "strategies.py").read_text(encoding="utf-8")

    go_horse_metrics = compute_class_metrics(
        GO_HORSE_GOD_CLASS_SNIPPET, "CanteenGodManager"
    )
    order_service_metrics = compute_class_metrics(services_src, "OrderService")
    inventory_service_metrics = compute_class_metrics(services_src, "InventoryService")
    metrics_engine_metrics = compute_class_metrics(services_src, "LiveMetricsEngine")
    product_entity_metrics = compute_class_metrics(entities_src, "Product")
    order_entity_metrics = compute_class_metrics(entities_src, "Order")
    queue_calc_metrics = compute_class_metrics(strategies_src, "SmartQueueCalculator")

    return {
        "comparison": {
            "before_go_horse": go_horse_metrics,
            "after_refactored": [
                order_service_metrics,
                inventory_service_metrics,
                metrics_engine_metrics,
                product_entity_metrics,
                order_entity_metrics,
                queue_calc_metrics,
            ],
        },
        "principles_applied": [
            {
                "title": "Integridade Conceitual (Conceptual Integrity)",
                "where": "Todo o projeto (domain/, infrastructure/, app.py, static/app.js)",
                "explanation": "100% dos identificadores de código seguem padrão estrito em inglês, enquanto a interface foca na linguagem das personas (Lucas, Mariana, Rafael e Patrícia).",
            },
            {
                "title": "Ocultamento de Informação (Encapsulamento)",
                "where": "domain/entities.py -> classes Product e Order",
                "explanation": "Atributos internos (_stock, _price, _status) são privados. O estoque jamais fica negativo porque `reserve_stock()` e `update_stock()` validam invariantes internamente.",
            },
            {
                "title": "Responsabilidade Única (SRP) e Alta Coesão (LCOM = 0)",
                "where": "domain/services.py -> InventoryService, OrderService, LiveMetricsEngine",
                "explanation": "Separamos gestão de estoque, ciclo de vida de pedidos e motor de métricas/capacidade das estufas em três serviços coesos com LCOM = 0.",
            },
            {
                "title": "Princípio Aberto/Fechado (OCP) & Substituição de Liskov (LSP)",
                "where": "domain/strategies.py -> PaymentStrategy (DailyComboDiscountPayment, ResidencyVoucherPayment...)",
                "explanation": "Novas regras de desconto (Combo do Dia 15% OFF e Voucher Monitoria 12% OFF) entraram como novas subclasses de `PaymentStrategy` sem alterar `OrderService`.",
            },
            {
                "title": "Segregação de Interfaces (ISP) & Inversão de Dependências (DIP)",
                "where": "domain/interfaces.py -> CatalogReader, InventoryManager, OrderRepository",
                "explanation": "Os serviços de alto nível não importam `sqlite3`; dependem apenas de abstrações segregadas por papel de cliente.",
            },
            {
                "title": "Lei de Demeter & Composição em vez de Herança",
                "where": "domain/entities.py (`order.is_delayed()`) & domain/strategies.py (`SmartQueueCalculator`)",
                "explanation": "O cálculo de capacidade física (4 salgados por ciclo de 2 min por máquina) é injetado por composição em `OrderService` e `LiveMetricsEngine`.",
            },
        ],
        "ai_mistake_story": {
            "title": "Onde a IA errou inicialmente e como corrigimos com o Cap. 5",
            "problem": "Na primeira sugestão (estilo Go-Horse), a IA colocou consultas SQL (`sqlite3.connect`), uma cadeia de `if/elif` para descontos de pagamento e subtração direta `product.stock -= qty` dentro do mesmo controller HTTP.",
            "correction": "Aplicamos Ocultamento de Informação (`product.reserve_stock(qty)`), extraímos a interface `PaymentStrategy` (Aberto/Fechado) e invertemos a dependência do SQLite através de `OrderRepository` e `InventoryManager` (DIP/ISP), zerando o LCOM dos serviços e quebrando o if/elif de pagamentos em classes polimórficas.",
        },
        "go_horse_snippet": GO_HORSE_GOD_CLASS_SNIPPET,
    }
