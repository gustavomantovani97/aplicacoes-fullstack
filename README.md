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
├── 02-vue3-todo/        # Desafio 2: Projeto Vue 3
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
7. **Auditoria de Qualidade (Lighthouse)**: No DevTools (`F12`), abra a aba **Lighthouse**, marque as opções *Performance*, *Accessibility*, *Best Practices* e *SEO* e clique em **Analyze page load**. As notas obtidas (Lighthouse 13.5, iguais no modo mobile e desktop; a to-do foi medida no build de produção, com `npm run build` e `npm run preview`):

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| 01-html-css | 100 | 100 | 100 | 100 |
| 02-vue3-todo | 100 | 100 | 100 | 100 |

---

### 2. Vue 3 (`02-vue3-todo/`)

#### Pré-requisitos
- Node.js versão `22.18.0` ou superior (ou versão LTS recente).
- Gerenciador de pacotes `npm`.

#### Como Rodar a Aplicação
1. No terminal, navegue até a pasta da aplicação:
   ```bash
   cd 02-vue3-todo
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento com o Vite:
   ```bash
   npm run dev
   ```
4. Abra o endereço exibido no terminal (por padrão, [`http://localhost:5173`](http://localhost:5173)) em qualquer navegador moderno.

#### Como Testar a Aplicação na Interface
1. **Foco Automático e Placeholder**: Ao carregar a página, observe que o campo *"O que precisa ser feito?"* já inicia automaticamente focado com o cursor piscante ativo e o placeholder visível, permitindo digitação imediata.
2. **Inclusão de Tarefas**: Digite o título de uma nova tarefa no campo e pressione Enter ou clique no botão **Adicionar**. A tarefa será inserida imediatamente no topo da lista.
3. **Bloqueio de Tarefa em Branco**: Tente clicar em "Adicionar" com o campo vazio ou apenas com espaços. Uma mensagem de erro acessível (`role="alert"`) será exibida e o foco retornará automaticamente ao campo de entrada.
4. **Conclusão de Tarefas**: Clique no botão circular com borda roxa (`.toggle-btn`) de qualquer tarefa. O botão mudará de estado, o título receberá efeito riscado (*line-through*) e o status acessível mudará para concluído (`aria-checked="true"`). Clique novamente para reabrir como pendente.
5. **Remoção de Tarefas**: Clique no botão com o ícone `✕` à direita de qualquer tarefa. O item será excluído da lista e a contagem numérica será recalculada instantaneamente.
6. **Filtros por Status**: Clique nos botões "Todas", "Pendentes" e "Concluídas". A lista filtrará os itens de forma dinâmica e os badges numéricos indicarão o total exato em cada estado.
7. **Limpeza em Lote de Concluídas**: Com tarefas marcadas como concluídas, clique no botão *"Limpar concluídas"* para removê-las de uma só vez.
8. **Paginação de Tarefas**: A aplicação já inicializa com 7 tarefas pré-cadastradas para demonstrar a paginação ativa (> 5 itens). Navegue entre a página 1 (5 primeiros itens) e a página 2 (2 itens restantes) utilizando os botões numéricos ou os botões "Anterior" e "Próxima".
9. **Persistência de Dados**: Crie, conclua ou remova tarefas e recarregue a página (F5). Todos os dados e estados permanecerão salvos graças à sincronização reativa com o `localStorage`.

#### Como Executar os Testes Automatizados e Auditoria de Código
Dentro da pasta `02-vue3-todo/`, execute:
- **Testes Unitários (Vitest)**:
  ```bash
  npm run test:unit
  ```
  *(Valida as regras de negócio do composable, isolamento de estado, paginação e integração dos componentes no DOM)*.
- **Checagem Estrita de Tipos (TypeScript)**:
  ```bash
  npm run type-check
  ```
- **Linter de Qualidade (Oxlint e ESLint)**:
  ```bash
  npm run lint
  ```
- **Compilação de Produção (Build Vite)**:
  ```bash
  npm run build
  ```

---

### 3. TypeScript (`03-typescript/`)

#### Pré-requisitos
- Node.js `22.18.0` ou superior (ou versão LTS recente).
- Gerenciador de pacotes `npm`.

#### Como Rodar o Exemplo
1. No terminal, acesse a pasta do desafio:
   ```bash
   cd 03-typescript
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a demonstração:
   ```bash
   npm start
   ```
   O terminal exibirá o array original, os nomes filtrados (`[ 'Ana', 'Pedro' ]`) e os exemplos das funções genéricas.

#### Testes e Checagem de Tipos
- **Testes unitários (`node:test`)**:
  ```bash
  npm test
  ```
  Roda os 10 testes unitários validando o filtro estrito, limites de idade, arrays vazios e o comportamento genérico.
- **Checagem de tipos (TypeScript)**:
  ```bash
  npm run typecheck
  ```
  Roda o compilador (`tsc --noEmit`) para validar a tipagem de todo o projeto sem gerar arquivos.
- **Teste prático da proteção de tipos**:
  Para ver o TypeScript barrando um campo inválido, troque temporariamente `'age'` por `'name'` em `src/index.ts`:
  ```ts
  const filteredObjects = filterByNumericField(users, 'name', 23);
  ```
  Ao rodar `npm run typecheck`, o compilador recusa a chamada com o erro:
  `Argument of type '"name"' is not assignable to parameter of type 'NumericKeys<User>'.`
  Depois do teste, basta voltar o campo para `'age'`.

---

### 4. Banco de Dados (`04-database-sql/`)

#### Pré-requisitos
- Um servidor MySQL 8 ou MariaDB rodando.
- Um usuário com permissão para criar o banco `desafio`.

#### Como Rodar
Os arquivos rodam em ordem: `01` cria o banco e a tabela, `02` insere os dados e `03` executa as consultas.

Pelo terminal:
```bash
cd 04-database-sql
mysql -u SEU_USUARIO -p < 01-schema.sql
mysql -u SEU_USUARIO -p < 02-seed.sql
mysql -u SEU_USUARIO -p --table < 03-queries.sql
```
No MariaDB, o comando também pode ser `mariadb` no lugar de `mysql`.

Pelo MySQL Workbench: abra cada arquivo em **File → Open SQL Script…**, na mesma ordem, e execute com o ícone do raio.

O `02-seed.sql` deve rodar uma vez só. Rodar de novo dá erro de registro duplicado. Para recomeçar do zero, rode o `01-schema.sql` de novo, que recria a tabela vazia, e depois o `02-seed.sql`.

#### Resultado Esperado
Consulta 1, do mais recente para o mais antigo:

| id | name | email | created_at |
|---|---|---|---|
| 3 | Maria | maria@email.com | 2024-02-15 00:00:00 |
| 2 | Pedro | pedro@email.com | 2024-02-01 00:00:00 |
| 1 | Ana | ana@email.com | 2024-01-01 00:00:00 |

Consulta 2 (bônus), usuários por mês:

| mes | total_usuarios |
|---|---|
| 2024-01 | 1 |
| 2024-02 | 2 |
