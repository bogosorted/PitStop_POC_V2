# Mapa de Fundamentos de Desenvolvimento de Software (FDS) no Código e no Site · PitStop V2

> Referência: **Engenharia de Software Moderna** (Marco Tulio Valente) + Especificações de Personas e Redesign para 15 Minutos.

---

## 1. Visão Geral por Capítulo de FDS

| Capítulo (FDS) | Conceitos-Chave Trabalhados | Onde está no Site (Interface) | Onde está no Código (`PitStop_POC_V2`) |
| :--- | :--- | :--- | :--- |
| **Cap. 1 & 2 · Processos Ágeis & Incrementos (MVP / PoC)** | Evolução iterativa da Entrega 1 (*Go-Horse*) para a Entrega 2 (*PoC Final Refatorada*), foco em entrega de valor real em ciclos curtos. | Aba **`Cap. 5 & Métricas`** no topo do site (comparativo *Antes: Go-Horse* vs. *Depois: PoC Final V2*). | [`domain/code_metrics.py`](../domain/code_metrics.py) (`GO_HORSE_GOD_CLASS_SNIPPET` vs. classes refatoradas). |
| **Cap. 3 · Requisitos, Personas e Histórias de Usuário** | Levantamento de requisitos centrado nas **4 Personas** (**Lucas**, **Mariana**, **Rafael** e **Patrícia**) e na restrição física real (~200 alunos em 15 min, 2 atendentes, 4 salgados/ciclo de 2 min). | Seletor de Personas (**`👤 Lucas / Mariana / Rafael`**), **Combo do Dia**, filtro **`🍱 Almoço do Dia`**, **Suporte da Atendente (`👩‍🍳 Suporte`)** e **Painel da Patrícia**. | [`docs/PERSONAS.md`](./PERSONAS.md), [`domain/entities.py`](../domain/entities.py) (`PERSONA_PROFILES`, `CANTEEN_CAPACITY_SPEC`, `SupportTicket`). |
| **Cap. 4 · Modelos & Visão Estrutural** | Modelagem do domínio separando Entidades (`Product`, `Order`), Objeto de Valor (`OrderItem`), Chamados (`SupportTicket`) e Contratos (`CatalogReader`, `InventoryManager`, `OrderRepository`). | Fluxo de estados visível no Kanban da Patrícia (*1. Recebido → 2. Em Preparo → 3. Pronto no Balcão*) e na tela de Senha (`PS-105`). | [`domain/entities.py`](../domain/entities.py) (`STATUS_TRANSITIONS`) e [`domain/interfaces.py`](../domain/interfaces.py). |
| **Cap. 5 · Princípios de Projeto (Foco Principal do Desafio)** | Integridade Conceitual, Ocultamento de Informação, Coesão, Acoplamento, SOLID (SRP, OCP, LSP, ISP, DIP), Demeter, Composição e Métricas (LOC, LCOM, CBO, Complexidade Ciclomática). | Aba interativa **`Cap. 5 & Métricas`**, tela **`🏷️ Descontos`** (Strategies polimórficas) e cálculo de fila por ciclo de estufa. | [`domain/entities.py`](../domain/entities.py), [`domain/interfaces.py`](../domain/interfaces.py), [`domain/strategies.py`](../domain/strategies.py), [`domain/services.py`](../domain/services.py) e [`infrastructure/sqlite_repository.py`](../infrastructure/sqlite_repository.py). |

---

## 2. Detalhamento Completo do Capítulo 5 (Princípios de Projeto)

### 2.1. Ocultamento de Informação (Information Hiding / Encapsulamento)
- **No Código:**
  - [`domain/entities.py`](../domain/entities.py): **100% dos atributos** das classes `Product`, `OrderItem`, `Order` e `SupportTicket` são privados (`self._stock`, `self._price`, `self._status`, `self._quantity`, `self._call_count`, etc.).
  - Nenhuma camada externa faz `product._stock -= qty`. A baixa de estoque ocorre exclusivamente pelo método `product.reserve_stock(quantity)`, que valida a invariante `stock >= 0`.
  - [`app.py`](../app.py): O container `ApplicationContainer` também oculta seus adaptadores internos (`self._repository`, `self._order_service`, `self._inventory_service`), expondo apenas operações de fachada.
- **No Site:**
  - Quando o estoque de um salgado chega a `0`, o card no App do Aluno bloqueia automaticamente o botão `+` e exibe `Esgotado` (derivado da propriedade encapsulada `product.is_out_of_stock`).

### 2.2. Integridade Conceitual (Conceptual Integrity)
- **No Código:**
  - Padronização estrita: todos os nomes de classes, métodos, variáveis, rotas e tabelas SQLite estão em **inglês** (`OrderService`, `SmartQueueCalculator`, `reserve_stock`, `ContactlessCardPayment`), evitando mistura de idiomas (`portuglês`) no código.
- **No Site:**
  - Toda a comunicação visual segue a identidade **PitStop CESAR** (`#FAF3EB` creme, `#EE651D` laranja, `#1C1C1E` carvão) e vocabulário direto de 15 minutos (*"O que vai ser hoje?"*, *"Pagar agora com Pix"*, *"Pagar no cartão"*, *"Suporte da Atendente"*).

### 2.3. Alta Coesão (`LCOM = 0`) & Princípio da Responsabilidade Única (SRP)
- **No Código ([`domain/services.py`](../domain/services.py)):**
  - Em vez de uma *God Class* (`CanteenGodManager` com `LCOM = 3`), cada classe possui uma única responsabilidade e **`LCOM = 0`**:
    1. `InventoryService`: gerencia apenas catálogo e reposição de estoque.
    2. `OrderService`: coordena apenas criação de pedidos e avanço de status na cozinha.
    3. `LiveMetricsEngine`: calcula indicadores em tempo real, ocupação de ciclos das estufas e previsão por horário.
- **No Site:**
  - Visível na tabela ao vivo da aba **`Cap. 5 & Métricas`**, onde todas as 6 classes refatoradas apresentam **`LCOM = 0 (Alta Coesão)`**.

### 2.4. Princípio Aberto/Fechado (OCP) & Substituição de Liskov (LSP)
- **No Código ([`domain/strategies.py`](../domain/strategies.py)):**
  - `OrderService` está **fechado para modificação** e **aberto para extensão** através do contrato `PaymentStrategy`:
    - `InstantPixPayment` (`PIX` — *"Pagar agora com Pix"*)
    - `ContactlessCardPayment` (`CARTAO` — *"Pagar no cartão"*)
    - `DailyComboDiscountPayment` (`COMBO_DIA` — *"Combo do Dia 15% OFF"*, pensado para a persona **Mariana**)
    - `PitStopWalletPayment` (`PITSTOP_WALLET` — *"Saldo PitStop 5% OFF"*)
    - `ResidencyVoucherPayment` (`RESIDENCY_VOUCHER` — *"Voucher Monitoria 12% OFF"*)
  - Todas as subclasses respeitam a pós-condição de Liskov (`0 <= calculate_final_amount(subtotal) <= subtotal`).
- **No Site:**
  - Na tela **Checkout (`← Pagamento`)** e em **Menu (`≡`) → `🏷️ Descontos`**, o aluno ativa qualquer cupom/estratégia e o desconto é calculado polimorficamente sem um único `if/elif` dentro de `OrderService`.

### 2.5. Segregação de Interfaces (ISP) & Inversão de Dependências (DIP)
- **No Código ([`domain/interfaces.py`](../domain/interfaces.py) & [`infrastructure/sqlite_repository.py`](../infrastructure/sqlite_repository.py)):**
  - **ISP:** Interfaces separadas por papel de cliente (`CatalogReader` apenas leitura, `InventoryManager` para estoque, `OrderRepository` para pedidos).
  - **DIP:** `domain/services.py` **não importa `sqlite3`**. Os serviços de alto nível dependem apenas das abstrações em `domain/interfaces.py`, e `SqliteCanteenRepository` implementa essas abstrações.

### 2.6. Lei de Demeter & Composição em vez de Herança
- **No Código:**
  - **Demeter ([`domain/entities.py`](../domain/entities.py)):** `order.is_delayed(now)` e `order.advance_status()` respondem diretamente sem que o chamador precise encadear objetos internos.
  - **Composição ([`domain/strategies.py`](../domain/strategies.py)):** `SmartQueueCalculator` modela a capacidade física real do documento de personas (**4 salgados aquecidos por ciclo de 2 minutos por máquina**) e é injetado por composição em `OrderService` e `LiveMetricsEngine`.
