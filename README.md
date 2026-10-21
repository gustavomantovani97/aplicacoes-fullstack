# Desafio Técnico — Desenvolvedor Fullstack Júnior


Este repositório reúne as minhas soluções para o teste técnico da vaga de **Pessoa Desenvolvedora Fullstack Júnior**.

Procurei organizar cada desafio em pastas separadas para que o código fique limpo e fácil de testar. As explicações de como pensei cada solução, as respostas de arquitetura e o relato sobre o uso de IA estão no arquivo [`EXPLICACOES.md`](./EXPLICACOES.md).

---

## Sobre o projeto 

Aqui está um resumo de onde encontrar cada parte do desafio:

- **1. HTML + CSS** ([`01-html-css/`](./01-html-css/)): Formulário de cadastro com validações básicas e layout estilizado.
- **2. Vue 3 (Composition API)** ([`02-vue3-todo/`](./02-vue3-todo/)): Lista de tarefas onde dá para adicionar, concluir, excluir e filtrar tarefas.
- **3. TypeScript** ([`03-typescript/`](./03-typescript/)): Função tipada que filtra usuários por idade, além de uma versão genérica extra.
- **4. Banco de Dados (MySQL)** ([`04-database-sql/`](./04-database-sql/)): Queries para listar usuários em ordem decrescente e contagem mensal de cadastros.
- **5. Backend NestJS** ([`05-backend-nestjs/`](./05-backend-nestjs/)): API simples com endpoints `GET /users` e `POST /users` salvando em memória.
- **6. Git & Commits**: Histórico dividido em passos para mostrar a evolução do código.
- **7. Organização de Projeto**: Minha proposta de estrutura de pastas para Vue e NestJS (veja em [`EXPLICACOES.md#seção-7`](./EXPLICACOES.md#seção-7)).
- **8. Resolução de Problema**: Análise de lentidão na tela de login e ideias para resolver (veja em [`EXPLICACOES.md#seção-8`](./EXPLICACOES.md#seção-8)).
- **Uso de Ferramentas de IA**: Relato transparente de como usei IA no dia a dia e o que conheço sobre MCP (veja em [`EXPLICACOES.md#uso-de-ferramentas-de-ia`](./EXPLICACOES.md#uso-de-ferramentas-de-ia)).

---

## Estrutura de Pastas

```text
aplicacoes-fullstack/
├── 01-html-css/         # Desafio 1: index.html e style.css
├── 02-vue3-todo/        # Desafio 2: Projeto Vue 3 com Vite
├── 03-typescript/       # Desafio 3: Script TypeScript e exemplos de filtro
├── 04-database-sql/     # Desafio 4: Scripts SQL (schema e queries)
├── 05-backend-nestjs/   # Desafio 5: API NestJS com controller e service
├── EXPLICACOES.md       # Respostas conceituais e justificativas
└── README.md            # Este guia
```

---