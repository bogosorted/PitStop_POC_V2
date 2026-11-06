# PitStop V2 · Cantina Universitária CESAR (PoC Final)

> **Fundamentos de Desenvolvimento de Software (FDS) · Capítulo 5 (Engenharia de Software Moderna — Marco Tulio Valente)**

O **PitStop V2** resolve o gargalo real do intervalo de **15 minutos** na cantina da **CESAR School** (~200 alunos saindo simultaneamente para 2 atendentes, com capacidade física de aquecimento de **4 salgados por ciclo de 2 minutos por máquina**).

- **App do Aluno (Redesign para 15 Minutos):** Vitrine rápida com seletor de unidade e fila ao vivo (`Brum ~8 min`, `Tiradentes ~6 min`, `Apolo ~7 min`), **Combo do Dia** em 1 toque, checkout enxuto (`Pagar agora com Pix · Mais rápido` ou `Pagar no cartão`), tela de QR Code Pix com liberação imediata da senha (`PS-105`), botão de **Suporte da Atendente (`👩‍🍳 Suporte`)** e **Menu do Aluno** (*Horários*, *Pedidos*, *Perfil/Personas* e *Descontos*).
- **Público-Alvo & Personas Mapeadas ([`docs/PERSONAS.md`](./docs/PERSONAS.md)):**
  - **Lucas (Aluno com pressa):** pede antes, paga no Pix/Cartão e só retira no balcão com a senha.
  - **Mariana (Aluna planejada):** consulta preços, ativa o **Combo do Dia (15% OFF)** ou cupons e controla gastos.
  - **Rafael (Almoço / troca de turno):** consulta o **Almoço do Dia** e reserva janela de horário dentro da capacidade real.
  - **Patrícia (Atendente da cantina):** acompanha fila, ciclos de estufa (`02:00`), chamados de suporte dos alunos, horários e estoque em uma única tela (*1. Recebido → 2. Em Preparo → 3. Pronto no Balcão*).

---

## Equipe & Papéis em Formato XP (*Extreme Programming*)

Aplicamos as práticas do **XP (Programação em Pares, Cliente Presente, Design Simples, Pequenos Lançamentos e Refatoração Contínua)** dividindo a equipe em **4 duplas especializadas**:

| Dupla XP | Integrantes | Papel XP & Responsabilidades Detalhadas |
| :--- | :--- | :--- |
| **Dupla 1 · Design System & Identidade Visual** | **Andressa & Vitor** | **Designers de Produto & Prototipação Visual:** Responsáveis pela direção de arte e pelo redesign completo focado na janela de 15 minutos ([`docs/Redesign_App_Aluno_15min.pdf`](./docs/Redesign_App_Aluno_15min.pdf)). Definiram a paleta de cores (**Creme `#FAF3EB`**, **Laranja PitStop `#EE651D`** e **Preto Carvão `#1C1C1E`**), tipografia, hierarquia visual dos cards 2x2, destaque do *Combo do Dia* e estética limpa sem ruído visual. |
| **Dupla 2 · Construção do Site, Arquitetura & Revisão de Prompts** | **Lívia & Gabriel Aragão** | **Desenvolvedores Full-Stack & Guardiões da Arquitetura (Cap. 5):** Responsáveis pela criação do site, implementação do back-end Python/SQLite e front-end reativo, além da **revisão crítica e refinamento dos prompts**. Conduziram a refatoração da versão *Go-Horse* para a arquitetura limpa da PoC V2 aplicando Ocultamento de Informação, SRP (`LCOM = 0`), Aberto/Fechado (`PaymentStrategy`), ISP/DIP e cálculo de métricas via AST. |
| **Dupla 3 · Engenharia de Prompts, UI & UX** | **Ricardo & Renato** | **Especialistas em Prompt Design, Fluxos de UI e Experiência do Usuário (UX):** Responsáveis pela formulação inicial dos prompts estruturados para geração de interface e fluxos de interação. Projetaram a jornada de compra sem fricção em 3 passos (*Vitrine → Pagamento Pix/Cartão → Senha `PS-105`*), o modal de **Suporte da Atendente** e a navegação mobile-first focada em baixa carga cognitiva. |
| **Dupla 4 · Pesquisa de Campo, Personas, Viabilidade & Auditoria Conceitual via IA** | **Rodrigo & João** | **Cliente Presente (*On-Site Customer*), Viabilidade Operacional & Revisão Teórica (Cap. 5):** Responsáveis pela pesquisa de campo na cantina da CESAR School, mapeamento de empecilhos reais (~200 alunos em 15 min, apenas 2 atendentes e ciclo físico de **4 salgados a cada 2 minutos por máquina**), criação das 4 personas (**Lucas**, **Mariana**, **Rafael** e **Patrícia** — [`docs/Personas_Cantina_Universitaria.pdf`](./docs/Personas_Cantina_Universitaria.pdf)) e auditoria via IA para validar onde os princípios do Capítulo 5 estavam sendo cumpridos ou violados. |

---

## Relatório de Execução XP: Como Foi o Processo (Da Entrega 1 Go-Horse à PoC Final V2)

1. **Pesquisa de Campo, Personas e Descoberta de Empecilhos (Rodrigo & João):**
   - Antes de codificar a V2, a dupla de pesquisa foi a campo entender por que a fila travava no intervalo de 15 minutos. Identificaram que não bastava uma tela bonita: se **200 alunos** pedirem ao mesmo tempo para **2 atendentes**, a cantina colapsa porque cada estufa/forno aquece apenas **4 salgados por ciclo de 2 minutos (`02:00`)**.
   - A partir disso, mapearam as personas reais (**Lucas**, **Mariana**, **Rafael** e a atendente **Patrícia**) e auditaram via IA os pontos em que o código da Entrega 1 (*Go-Horse*) feria o Capítulo 5 (como a *God Class* `CanteenGodManager` com SQL embutido e `if/elif` de pagamentos).
2. **Concepção de UI/UX e Engenharia de Prompts (Ricardo & Renato + Andressa & Vitor):**
   - Com os insumos de campo, **Andressa e Vitor** criaram o novo design visual focado em decisão instantânea (seletor de prédio `Brum`, `Tiradentes` e `Apolo` já mostrando os minutos de espera no topo, *Combo do Dia* em destaque e tela de senha `PS-105` de alto contraste).
   - Em paralelo, **Ricardo e Renato** estruturaram os prompts de UI/UX garantindo que todas as necessidades das personas (como o *Almoço do Dia* do Rafael, os *Cupons/Descontos* da Mariana, o pagamento rápido via *Pix ou Cartão* do Lucas e o botão de *Suporte da Atendente*) entrassem na experiência sem poluir a tela.
3. **Revisão de Prompts, Refatoração Cap. 5 e Criação do Site (Lívia & Gabriel Aragão):**
   - **Lívia e Aragão** revisaram e refinaram os prompts para impedir que a IA gerasse código acoplado (*Go-Horse*), construindo o site completo sobre uma arquitetura modular em camadas (`domain/` e `infrastructure/`).
   - Incorporaram a regra física de capacidade (**4 salgados / ciclo de 2 min**) dentro de `SmartQueueCalculator` (injetado por **Composição**), isolaram os descontos em subclasses polimórficas de `PaymentStrategy` (**OCP/LSP**), blindaram 100% dos atributos das entidades com **Ocultamento de Informação** e implementaram o analisador sintático em `domain/code_metrics.py` para provar matematicamente a queda de **`LCOM = 3` para `LCOM = 0`**.

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
| **2. Ocultamento de Informação (Encapsulamento)** | [`domain/entities.py`](./domain/entities.py) (`Product`, `OrderItem`, `Order`, `SupportTicket`) e [`app.py`](./app.py) (`ApplicationContainer`) | Atributos `_stock`, `_price`, `_quantity` e `_status` são 100% privados; `product.reserve_stock(qty)` garante a invariante `stock >= 0`. |
| **3. Responsabilidade Única (SRP) & Alta Coesão (`LCOM = 0`)** | [`domain/services.py`](./domain/services.py) (`InventoryService`, `OrderService`, `LiveMetricsEngine`) | Serviços separados para catálogo/estoque, ciclo de vida do pedido e motor de métricas/capacidade das estufas, todos com **`LCOM = 0`**. |
| **4. Aberto/Fechado (OCP) & Substituição de Liskov (LSP)** | [`domain/strategies.py`](./domain/strategies.py) (`PaymentStrategy`, `ContactlessCardPayment`, `DailyComboDiscountPayment`, `ResidencyVoucherPayment`) | Novos métodos e descontos (*Pagar no Cartão*, *Combo do Dia 15% OFF* e *Voucher Monitoria 12% OFF*) entram como novas subclasses de `PaymentStrategy` **sem alterar uma linha de `OrderService`**. |
| **5. Segregação de Interfaces (ISP)** | [`domain/interfaces.py`](./domain/interfaces.py) (`CatalogReader`, `InventoryManager`, `OrderRepository`) | Contratos enxutos separados por papel de cliente (consulta de cardápio vs. gestão de estoque vs. persistência de pedidos). |
| **6. Inversão de Dependências (DIP)** | [`domain/interfaces.py`](./domain/interfaces.py) + [`infrastructure/sqlite_repository.py`](./infrastructure/sqlite_repository.py) | `domain/services.py` **não importa `sqlite3`**; depende apenas de abstrações injetadas em [`app.py`](./app.py). |
| **7. Lei de Demeter & Composição em vez de Herança** | [`domain/entities.py`](./domain/entities.py) (`order.is_delayed()`) + [`domain/strategies.py`](./domain/strategies.py) (`SmartQueueCalculator`) | `SmartQueueCalculator` modela o ciclo físico de **4 salgados a cada 2 minutos por máquina** e é injetado por **composição** nos serviços. |
| **8. Métricas de Código via AST (Seção 5.7)** | [`domain/code_metrics.py`](./domain/code_metrics.py) (rota `/api/chapter5` e aba **Cap. 5 & Métricas**) | Calcula em tempo real **LOC**, **LCOM**, **CBO** e **Complexidade Ciclomática** comparando a *God Class* Go-Horse (`LCOM = 3`) com a arquitetura refatorada (`LCOM = 0`). |

---

## Documentação de Design, Personas e Fundamentos de FDS

- [`docs/FUNDAMENTOS_FDS_NO_CODIGO.md`](./docs/FUNDAMENTOS_FDS_NO_CODIGO.md) — Mapa completo de onde cada capítulo de FDS está aplicado no código e no site.
- [`docs/PERSONAS.md`](./docs/PERSONAS.md) — Especificação das 4 personas (**Lucas**, **Mariana**, **Rafael** e **Patrícia**) e capacidade operacional.
- [`docs/Personas_Cantina_Universitaria.pdf`](./docs/Personas_Cantina_Universitaria.pdf) — Estudo de campo de personas, viabilidade e capacidade real.
- [`docs/Redesign_App_Aluno_15min.pdf`](./docs/Redesign_App_Aluno_15min.pdf) — Telas do redesign focado nos 15 minutos de intervalo.
