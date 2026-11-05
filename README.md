# PitStop V2 · Cantina Universitária CESAR (PoC Final)

> **Fundamentos de Desenvolvimento de Software (FDS) · Capítulo 5 (Engenharia de Software Moderna — Marco Tulio Valente)**

O **PitStop V2** resolve o gargalo real do intervalo de **15 minutos** na cantina da **CESAR School** (~200 alunos saindo simultaneamente para 2 atendentes, com capacidade física de aquecimento de **4 salgados por ciclo de 2 minutos por máquina**).

- **App do Aluno (Redesign para 15 Minutos):** Vitrine rápida com seletor de unidade e fila ao vivo (`Brum ~8 min`, `Tiradentes ~6 min`, `Apolo ~7 min`), **Combo do Dia** em 1 toque, checkout enxuto (`Pagar agora com Pix · Mais rápido` ou `Pagar na retirada`), tela de QR Code Pix com liberação imediata da senha (`PS-105`) e **Menu do Aluno** (*Horários*, *Pedidos*, *Perfil/Personas* e *Descontos*).
- **Público-Alvo & Personas Mapeadas ([`docs/PERSONAS.md`](./docs/PERSONAS.md)):**
  - **Lucas (Aluno com pressa):** pede antes, paga no Pix e só retira no balcão com a senha.
  - **Mariana (Aluna planejada):** consulta preços, ativa o **Combo do Dia (15% OFF)** ou cupons e controla gastos.
  - **Rafael (Almoço / troca de turno):** consulta o **Almoço do Dia** e reserva janela de horário dentro da capacidade real.
  - **Patrícia (Atendente da cantina):** acompanha fila, ciclos de estufa (`02:00`), horários e estoque em uma única tela (*1. Recebido → 2. Em Preparo → 3. Pronto no Balcão*).

---

## Como Rodar

Sem dependências externas (utiliza apenas a biblioteca padrão do Python 3: `http.server`, `sqlite3` e `ast`):

```bash
python3 app.py
```

Acesse no navegador: **`http://localhost:8080`**

---

## Onde estão os Princípios do Capítulo 5 no Código

| Princípio / Conceito (Cap. 5) | Onde está no código | Aplicação prática |
| :--- | :--- | :--- |
| **1. Integridade Conceitual** | Todo o projeto ([`domain/`](./domain), [`infrastructure/`](./infrastructure), [`app.py`](./app.py)) | 100% dos identificadores (classes, métodos, atributos e banco) em inglês; interface em português voltada às personas. |
| **2. Ocultamento de Informação (Encapsulamento)** | [`domain/entities.py`](./domain/entities.py) (`Product`, `Order`) | Atributos `_stock`, `_price` e `_status` são privados; `product.reserve_stock(qty)` garante a invariante `stock >= 0`. |
| **3. Responsabilidade Única (SRP) & Alta Coesão (`LCOM = 0`)** | [`domain/services.py`](./domain/services.py) (`InventoryService`, `OrderService`, `LiveMetricsEngine`) | Serviços separados para catálogo/estoque, ciclo de vida do pedido e motor de métricas/capacidade das estufas, todos com **`LCOM = 0`**. |
| **4. Aberto/Fechado (OCP) & Substituição de Liskov (LSP)** | [`domain/strategies.py`](./domain/strategies.py) (`PaymentStrategy`, `DailyComboDiscountPayment`, `ResidencyVoucherPayment`) | Novos descontos (*Combo do Dia 15% OFF* e *Voucher Monitoria 12% OFF*) entram como novas subclasses de `PaymentStrategy` **sem alterar uma linha de `OrderService`**. |
| **5. Segregação de Interfaces (ISP)** | [`domain/interfaces.py`](./domain/interfaces.py) (`CatalogReader`, `InventoryManager`, `OrderRepository`) | Contratos enxutos separados por papel de cliente (consulta de cardápio vs. gestão de estoque vs. persistência de pedidos). |
| **6. Inversão de Dependências (DIP)** | [`domain/interfaces.py`](./domain/interfaces.py) + [`infrastructure/sqlite_repository.py`](./infrastructure/sqlite_repository.py) | `domain/services.py` **não importa `sqlite3`**; depende apenas de abstrações injetadas em [`app.py`](./app.py). |
| **7. Lei de Demeter & Composição em vez de Herança** | [`domain/entities.py`](./domain/entities.py) (`order.is_delayed()`) + [`domain/strategies.py`](./domain/strategies.py) (`SmartQueueCalculator`) | `SmartQueueCalculator` modela o ciclo físico de **4 salgados a cada 2 minutos por máquina** e é injetado por **composição** nos serviços. |
| **8. Métricas de Código via AST (Seção 5.7)** | [`domain/code_metrics.py`](./domain/code_metrics.py) (rota `/api/chapter5` e aba **Cap. 5 & Métricas**) | Calcula em tempo real **LOC**, **LCOM**, **CBO** e **Complexidade Ciclomática** comparando a *God Class* Go-Horse (`LCOM = 3`) com a arquitetura refatorada (`LCOM = 0`). |

---

## Documentação de Design & Produto

- [`docs/PERSONAS.md`](./docs/PERSONAS.md) — Especificação das 4 personas (**Lucas**, **Mariana**, **Rafael** e **Patrícia**) e capacidade operacional.
- [`docs/Personas_Cantina_Universitaria.pdf`](./docs/Personas_Cantina_Universitaria.pdf) — Apresentação do estudo de personas e capacidade real.
- [`docs/Redesign_App_Aluno_15min.pdf`](./docs/Redesign_App_Aluno_15min.pdf) — Telas do redesign focado nos 15 minutos de intervalo.
