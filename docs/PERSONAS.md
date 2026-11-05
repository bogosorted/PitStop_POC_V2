# Público-Alvo, Personas e Capacidade Operacional · PitStop CESAR

> Documento de referência de Produto & UX ([`Personas_Cantina_Universitaria.pdf`](./Personas_Cantina_Universitaria.pdf))

---

## 1. O Desafio Real da Cantina (Contexto Operacional)

- **Pico simultâneo:** Pelo menos **200 alunos** saem para o intervalo ao mesmo tempo.
- **Janela crítica:** O intervalo dura apenas **15 minutos** e a operação conta com **2 atendentes**.
- **Gargalo físico (Capacidade Real):**
  - Cada máquina aquece cerca de **4 salgados por ciclo de 2 minutos (`02:00`)**.
  - A capacidade real depende do número de máquinas, do tempo de montagem/entrega e da concorrência com pedidos presenciais.
- **Proposta de Valor:** Antecipar pedidos e organizar a retirada em janelas de horário conforme a **capacidade real da cantina** (*"Peça antes. Retire na hora. Aproveite seu intervalo."*).

---

## 2. Personas Mapeadas

### 🏃‍♂️ 1. Lucas — O Aluno com Pressa
> *"Quero chegar à cantina, pegar meu lanche e aproveitar meus 15 minutos."*

- **Perfil:** Focado em aproveitar ao máximo os 15 minutos de intervalo sem perder tempo na fila.
- **Necessidade:** Pedir antes de sair da sala, pagar rapidamente pelo celular (Pix) e receber aviso claro quando o pedido estiver pronto.
- **Objetivo:** Chegar ao balcão apenas para mostrar a senha, retirar o lanche rapidamente e voltar à aula.
- **Reflexo no PitStop:** Funil de compra em 3 toques, seletor de unidade com estimativa de fila em tempo real (`Brum ~8 min`, `Tiradentes ~6 min`, `Apolo ~7 min`), Pix com liberação imediata de senha (`PS-105`) e alerta de retirada.

---

### 💰 2. Mariana — A Aluna Planejada
> *"Quero escolher meu lanche com antecedência e saber quanto vou gastar."*

- **Perfil:** Organizada, consulta preços, controla seus gastos diários e revisa o pedido antes de confirmar o pagamento.
- **Necessidade:** Visualizar cardápio com preços transparentes, combos/descontos ativos e resumo claro do total antes de pagar.
- **Objetivo:** Comprar com previsibilidade financeira e aproveitar benefícios estudantis.
- **Reflexo no PitStop:** Vitrine clara com preços, destaque para o **Combo do Dia** (Café + Pão de Queijo com desconto), área de **Descontos / Cupons Ativos** e resumo detalhado no checkout.

---

### 🍱 3. Rafael — O Aluno da Troca de Turno / Almoço
> *"Preciso saber se meu almoço estará pronto a tempo de comer antes da próxima aula."*

- **Perfil:** Depende da cantina entre turnos ou antes da próxima aula e precisa de previsibilidade de horário.
- **Necessidade:** Consultar as opções disponíveis no turno e saber exatamente quando o pedido estará pronto.
- **Objetivo:** Garantir que conseguirá se alimentar sem atrasar para a aula seguinte.
- **Reflexo no PitStop:** Agendamento com vagas limitadas por janela de horário conforme a capacidade das estufas/fornos e cálculo de SLA em tempo real (`QueueSlaCalculator`).

---

### 👩‍🍳 4. Patrícia — A Atendente da Cantina
> *"Preciso organizar os pedidos para entregar tudo certo e no horário."*

- **Perfil:** Recebe uma enxurrada de pedidos simultâneos assim que os alunos saem das salas.
- **Necessidade:** Acompanhar produtos, horários de retirada, fila de preparo e status em **uma única tela simples**, além de controlar o estoque.
- **Objetivo:** Evitar atrasos, confusões no balcão, vendas de itens esgotados e entregas incorretas.
- **Reflexo no PitStop:** Painel Operacional em 3 estágios (*1. Recebido/Na Fila → 2. Em Preparo → 3. Pronto no Balcão*), alerta de chamar senha novamente e controle rápido de estoque.

---

## 3. Fluxo de Compra Orientado à Capacidade

1. **Consulta por Turno:** O aluno consulta o cardápio disponível e escolhe os produtos.
2. **Alocação Inteligente de Horário:** O sistema oferece horários de retirada com vagas disponíveis, respeitando o limite físico de aquecimento (*4 salgados / ciclo de 2 min por equipamento*) e a margem para atendimento presencial.
3. **Operação Sincronizada:** As atendentes acompanham e avançam o pedido (*Recebido → Em Preparo → Pronto*).
4. **Retirada Expressa:** O aluno apresenta o código da senha (`PS-XXX`) e retira no ponto indicado (**Apolo**, **Brum** ou **Tiradentes**).
