# Desafio Técnico — Desenvolvedor Fullstack Júnior


Este repositório reúne as minhas soluções para o teste técnico da vaga de **Pessoa Desenvolvedora Fullstack Júnior**.

Procurei organizar cada desafio em pastas separadas para que o código fique limpo e fácil de testar. As explicações de como pensei cada solução, as respostas de arquitetura e o relato sobre o uso de IA estão no arquivo [`EXPLICACOES.md`](./EXPLICACOES.md).

---

## Sobre o projeto 

Aqui está um resumo de onde encontrar cada parte do desafio:

- **1. HTML + CSS** ([`01-html-css/`](./01-html-css/)): Formulário de cadastro com validações básicas e layout estilizado.
- **2. Vue 3 (Composition API)** ([`02-vue3-todo/`](./02-vue3-todo/)): Lista de tarefas onde é possível adicionar, concluir, excluir e filtrar tarefas.
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
├── 01-html-css/         # Desafio 1: index.html e css/styles.css
├── 02-vue3-todo/        # Desafio 2: Projeto Vue 3 com Vite
├── 03-typescript/       # Desafio 3: Script TypeScript e exemplos de filtro
├── 04-database-sql/     # Desafio 4: Scripts SQL (schema e queries)
├── 05-backend-nestjs/   # Desafio 5: API NestJS com controller e service
├── EXPLICACOES.md       # Respostas conceituais e justificativas
└── README.md            # Este guia
```

---

## Como Rodar e Testar

### 1. HTML + CSS (`01-html-css/`)
1. Abra o arquivo `01-html-css/index.html` em qualquer navegador (Google Chrome, Firefox, Edge).
2. **Teste de Bloqueio em Campos Vazios**: Clique no botão "Criar conta" com os campos em branco. O navegador interceptará o envio nativamente, impedindo a submissão e exibindo a mensagem nativa de obrigatoriedade no primeiro campo.
3. **Teste de Validação Visual `:user-invalid`**: Digite apenas uma letra no campo de e-mail e mude de campo (ou pressione Tab). O campo ficará com borda avermelhada e a mensagem de erro com o ícone `⚠` será exibida logo abaixo. Corrija para um e-mail válido (`nome@dominio.com`) e o erro desaparecerá de imediato.
4. **Teste de Senha Curta**: Digite uma senha com menos de 8 caracteres e tente submeter; o navegador indicará a necessidade de atingir 8 caracteres.
5. **Teste de Envio Bem-Sucedido (CSS `:target`)**: Preencha nome completo, e-mail válido e senha com 8 ou mais caracteres e clique em "Criar conta". O formulário navegará localmente para a âncora `#success-message`, revelando imediatamente a mensagem verde de sucesso estilizada.
6. **Teste de Retorno ao Formulário**: Clique em "Fazer novo cadastro" dentro do alerta de sucesso para limpar a âncora e retornar ao formulário.
7. **Auditoria de Qualidade (Lighthouse)**: No DevTools (`F12`), abra a aba **Lighthouse**, marque as opções *Performance*, *Accessibility*, *Best Practices* e *SEO* e clique em **Analyze page load**. A página foi projetada deliberadamente para cumprir todos os parâmetros técnicos da ferramenta, alcançando resultados plenamente satisfatórios em todas as categorias.
