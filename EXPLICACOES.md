# Seção 1 - 01-html-css: Formulário de cadastro

## O que eu fiz

Uma página de cadastro com os campos Nome, E-mail e Senha e um botão "Criar conta". Fiz tudo só com HTML e CSS, sem JavaScript. Como a solicitação era de HTML + CSS, quis ver até onde dava para chegar com o que o navegador já oferece.

## Por que o estilo neumórfico

Usei o mesmo estilo visual nas duas interfaces, a desta etapa e a da lista de tarefas. Escolhi o neumorfismo por ser um estilo neutro, que serve para aplicações de vários tipos e combina com um produto profissional, como uma ferramenta B2B. Também pesou o resultado: a skill de neumorfismo que usei gerou interfaces com identidade própria, sem a cara genérica de página feita por IA.

No estilo, o cartão parece saltar da tela, os campos parecem afundados e o botão tem efeito de clique. A própria skill avisa que esse efeito tem pouco contraste e, sem ajustes, não atende aos requisitos de acessibilidade (SKILLS UI, [2026]). Por isso deixei o efeito só nas superfícies e usei cores fortes no texto, como explico na parte do CSS.

## Como organizei o HTML

- O `<head>` tem `<html lang="pt-BR">`, viewport, `<title>`, meta description, `robots` e tags Open Graph. A meta description é o resumo que o buscador pode mostrar no resultado, e o Lighthouse aponta a falta dela como problema de SEO (GOOGLE, [2026a]).
- Não coloquei URL canônica, porque a página ainda não tem um endereço publicado. O canonical indica ao Google qual é a versão principal de uma página (GOOGLE, [2026e]). Apontar para um domínio inventado diria que a página verdadeira está em outro lugar.
- A estrutura usa `<header>`, `<main>`, `<section>` e `<footer>`, com um único `<h1>` ("Criar nova conta").
- Cada `<label>` tem `for` ligado ao `id` do campo, e cada mensagem de erro fica ligada ao campo pelo `aria-describedby`.

## Como funciona a validação

Usei os atributos nativos de validação do HTML: `required` nos três campos, `type="email"` no e-mail e `minlength="8"` na senha (MOZILLA, [2026h]). Não coloquei `novalidate`, então o próprio navegador bloqueia o envio e mostra o aviso quando algo está errado.

Para as mensagens embaixo de cada campo, usei a pseudo-classe `:user-invalid`. Ela só marca o campo depois que a pessoa interage com ele (MOZILLA, [2026b]). Com `:invalid`, os campos já apareceriam em vermelho assim que a página abre. O erro aparece com borda vermelha, texto e um ícone ⚠, para não depender só da cor.

## A mensagem de sucesso sem JavaScript

O formulário tem `action="#success-message"`. Quando tudo está válido e a pessoa envia, o navegador muda o endereço para `#success-message`. A pseudo-classe `:target` seleciona o elemento cujo `id` é igual a esse fragmento da URL (MOZILLA, [2026a]), então a regra `#success-message:target` mostra o alerta. O alerta tem `aria-live="polite"`, para o leitor de tela anunciar a mensagem (MOZILLA, [2026e]). O link "Fazer novo cadastro" volta para `#` e esconde o alerta.

Um cuidado: os campos não têm o atributo `name`. Com `method="GET"`, os dados do formulário vão para a URL (MOZILLA, [2026c]), e isso incluiria a senha. Sem `name`, nenhum campo entra no envio, e o endereço só troca o fragmento.

## Como organizei o CSS

O `css/styles.css` está dividido em blocos, nesta ordem:

1. Tokens: propriedades personalizadas (variáveis CSS) no `:root`, com cores, sombras, bordas e transições (MOZILLA, [2026g]).
2. Base: reset, `box-sizing` e tipografia.
3. Layout: estrutura da página, pensada primeiro para celular, com ajuste a partir de 640px.
4. Componentes: cartão, campos, botão e alerta.
5. Estados: `:hover`, `:focus-visible`, `:user-invalid`, `:target` e a media query `prefers-reduced-motion`, que reduz as animações para quem pediu isso no sistema (MOZILLA, [2026f]).

O fundo é `#e0e5ec`. Os textos usam `#111827` e `#2d3748`, e o botão é `#5e35b1` com texto branco. Todas as combinações ficam acima do contraste mínimo de 4.5:1 que o WCAG exige para texto normal no nível AA (W3C, 2023).

## Lighthouse

Notas no Lighthouse 13.5, iguais no modo mobile e no desktop. A nota de acessibilidade é a média ponderada das verificações automáticas que ele roda (GOOGLE, [2026c]).

| Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

---

# Seção 2 - 02-vue3-todo: Lista de tarefas com Vue 3

## O que eu fiz

Uma lista de tarefas com Vue 3, Composition API (`<script setup lang="ts">`), TypeScript e Vite. Dá para adicionar, concluir, remover e filtrar tarefas entre todas, pendentes e concluídas. O visual segue o mesmo estilo neumórfico da seção 1, pelos mesmos motivos.

Além do que foi pedido, coloquei três coisas: um botão para limpar as concluídas de uma vez, paginação de 5 tarefas por página e salvamento no `localStorage`, para as tarefas continuarem lá depois de recarregar a página.

## Como organizei os componentes

A ideia foi deixar cada componente com uma função só. Os dados descem por props e as ações sobem por eventos (VUE.JS, [2026e]).

- `App.vue`: monta a página, usa o composable e repassa os dados para os componentes. Também cuida da paginação e da mensagem de lista vazia.
- `TodoForm.vue`: campo e botão para adicionar. Não aceita texto vazio ou só com espaços, mostra o erro e devolve o foco ao campo. Emite `add-todo`.
- `TodoItem.vue`: uma tarefa da lista, com o botão de concluir e o de excluir. Emite `toggle` e `remove`.
- `TodoFilters.vue`: os botões de filtro, com a contagem de cada um, e o botão de limpar concluídas. Emite `change-filter` e `clear-completed`.
- `composables/useTodoList.ts`: toda a lógica fica aqui (estado, filtros, paginação e salvamento). Um composable é uma função que encapsula lógica com estado usando a Composition API (VUE.JS, [2026a]). Assim os componentes só cuidam da tela, e a lógica pode ser testada sem montar nenhum componente.
- `types/todo.ts`: o tipo `TodoItem` e o tipo do filtro (`'all' | 'pending' | 'completed'`).

A lista usa `v-for` com `:key="todo.id"`. A chave estável ajuda o Vue a identificar cada item quando a lista muda (VUE.JS, [2026d]).

## Primitivas da Composition API que usei

- `ref()`: para a lista de tarefas, o filtro atual e a mensagem lida pelo leitor de tela. Também usei para pegar o `<input>` do formulário e dar foco nele (VUE.JS, [2026g]).
- `reactive()`: para dados que andam juntos, como o texto e a mensagem de erro do formulário, e a página atual com a quantidade de itens por página (VUE.JS, [2026g]).
- `toRefs()`: no retorno do composable. Se eu desestruturasse o objeto do `reactive()` direto, perderia a reatividade. Com `toRefs()`, `currentPage` e `itemsPerPage` continuam reativos depois de desestruturados (VUE.JS, [2026f]).
- `computed()`: para a lista filtrada, o total de páginas, as tarefas da página atual e os contadores. O `computed` guarda o resultado em cache e só recalcula quando algo de que ele depende muda (VUE.JS, [2026c]).
- `watch()`: para efeitos colaterais (VUE.JS, [2026j]). Um salva a lista no `localStorage` sempre que ela muda. Outro volta para a página 1 quando o filtro muda. Um terceiro corrige a página atual se ela deixar de existir depois de uma exclusão.
- `defineProps()` e `defineEmits()`: para declarar, com tipos, o que cada componente recebe e o que ele avisa ao pai (VUE.JS, [2026e]).
- `onMounted()`: para dar foco no campo de nova tarefa quando a página carrega (VUE.JS, [2026b]).

## Paginação

A página atual é recortada com `slice(inicio, inicio + itensPorPagina)`. Usei `slice()` e não `splice()` porque o `slice()` devolve uma cópia rasa do trecho e não altera o array original (MOZILLA, [2026d]). Assim a lista reativa fica intacta.

## Acessibilidade e SEO

- O `index.html` tem `lang="pt-BR"`, `<title>`, meta description e tags Open Graph. Sem canonical, pelo mesmo motivo da seção 1.
- Os botões de filtro usam `aria-pressed`, e o botão de concluir usa `role="checkbox"` com `aria-checked`.
- Os botões de excluir e concluir têm `aria-label` com o nome da tarefa, para o leitor de tela dizer qual tarefa vai ser afetada.
- Uma área com `aria-live` anuncia quando uma tarefa é adicionada, concluída ou removida (MOZILLA, [2026e]).
- Os botões de concluir e excluir têm borda colorida (roxa e vermelha), porque no neumorfismo puro eles ficavam com cara de que não eram clicáveis.

## Testes

São 13 testes com Vitest (VITEST, [2026]), todos passando:

- 8 no composable (`useTodoList.spec.ts`): adicionar, recusar título em branco, concluir, excluir, filtrar, limpar concluídas e paginar.
- 5 de integração (`TodoApp.spec.ts`), que montam o app e simulam o uso na tela.

O `type-check` e o lint (Oxlint e ESLint) também passam sem erros.

## Lighthouse

Medi no build de produção (`npm run build` e `npm run preview`), porque o modo de desenvolvimento sempre tira nota pior. Na primeira rodada, acessibilidade deu 96 e SEO deu 91, e corrigi três coisas:

- As tarefas concluídas tinham `opacity: 0.85`, o que deixava o texto com contraste de 4.25:1, abaixo do mínimo de 4.5:1 (W3C, 2023). Tirei a opacidade; o texto riscado e a cor mais clara já mostram que a tarefa foi concluída.
- O botão "Limpar concluídas" tinha um `aria-label` diferente do texto visível. Quem usa comando de voz fala o que vê na tela, então removi o `aria-label` e deixei o próprio texto do botão como nome.
- Faltava o `robots.txt`, o arquivo que diz aos rastreadores quais endereços eles podem acessar (GOOGLE, [2026d]). Sem ele, o servidor devolvia o `index.html` no lugar, e o Lighthouse acusava arquivo inválido. Criei `public/robots.txt` liberando o acesso.

Depois das correções:

| Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

---

# Seção 3 - 03-typescript: Manipulação e tipagem com TypeScript

## O que eu fiz

Criei um módulo em TypeScript com o filtro de usuários solicitado e uma versão genérica para o bônus. O código roda no terminal com Node.js e `tsx`.

O array de entrada tem três pessoas: Ana (25 anos), Pedro (30 anos) e Maria (22 anos). A função principal, `getUserNamesOlderThan23`, devolve apenas os nomes de quem tem mais de 23 anos: `['Ana', 'Pedro']`.

## Como declarei os tipos e por quê

Defini a interface `User` com três propriedades:

```ts
export interface User {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}
```

Usei o modificador `readonly` nos campos e no array recebido (`readonly User[]`). Uma propriedade `readonly` não pode receber outro valor depois de criada (MICROSOFT, [2026d]). Assim as funções não conseguem alterar os dados originais por engano. Se alguém tentar fazer `user.age = 30` ou `users.push(...)`, o TypeScript acusa erro já no editor, antes de rodar.

## A função principal e o critério estrito

A função `getUserNamesOlderThan23` recebe a lista e encadeia um `.filter()` seguido de um `.map()`:

```ts
export function getUserNamesOlderThan23(userList: readonly User[]): string[] {
  return userList
    .filter((user) => user.age > 23)
    .map((user) => user.name);
}
```

O `filter` separa quem tem mais de 23 anos e o `map` pega só o nome. Usei `>` e não `>=` porque a solicitação diz "mais de 23": quem tem exatamente 23 anos fica de fora.

## O bônus com tipo genérico e NumericKeys

Para o bônus, não usei só `keyof T`. O `keyof` gera a união de todas as chaves de um tipo (MICROSOFT, [2026b]), então aceitaria qualquer campo, inclusive `name`. Criei um tipo que pega apenas as chaves com valor numérico:

```ts
export type NumericKeys<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];
```

É um tipo mapeado, que percorre cada propriedade de `T` para criar um tipo novo (MICROSOFT, [2026c]). Se o valor é `number`, ele guarda o nome da chave; se não é, guarda `never`. No final, `[keyof T]` junta tudo numa união, e o `never` some dela, sobrando só as chaves numéricas. O `-?` tira o "opcional" das propriedades, para o `undefined` não atrapalhar a comparação (MICROSOFT, [2026c]).

No caso do `User`, `NumericKeys<User>` resulta em `'id' | 'age'`. A chave `'name'` é descartada porque seu valor é `string`.

A função genérica `filterByNumericField` usa essa restrição:

```ts
export function filterByNumericField<T, K extends NumericKeys<T>>(
  items: readonly T[],
  key: K,
  threshold: number
): T[] {
  return items.filter((item) => {
    const value = item[key];
    return typeof value === 'number' && value > threshold;
  });
}
```

Se alguém tentar filtrar por `'name'`, o compilador aponta o erro `TS2345: Argument of type '"name"' is not assignable to parameter of type 'NumericKeys<User>'`. Uma comparação sem sentido como `"Ana" > 23` é barrada antes de o código rodar.

O `typeof value === 'number'` dentro da função existe porque, dentro de um genérico, o TypeScript não consegue deduzir sozinho que `item[key]` é um número, mesmo com a restrição em `K`. A checagem resolve isso para o compilador e também protege a função se ela receber dados fora do tipo esperado.

Fiz também a `filterAndPluckByNumericField`, que filtra pelo campo numérico e devolve só uma propriedade de cada objeto, como apenas os nomes ou apenas os ids. Com ela, `filterAndPluckByNumericField(users, 'age', 23, 'name')` dá o mesmo resultado da função principal.

## Testes e validação

Usei o executor de testes que já vem no Node.js, o módulo `node:test` (OPENJS FOUNDATION, [2026]), com `node:assert/strict`, sem instalar framework de teste. São 10 testes, que cobrem:

- O retorno exato `['Ana', 'Pedro']` para os dados fornecidos.
- A exclusão do valor limite (idade 23).
- O comportamento com arrays vazios e com listas em que ninguém cumpre o critério.
- A função genérica com usuários e com outro tipo de objeto (transações).
- A recusa em tempo de compilação, com `@ts-expect-error`, ao passar uma propriedade não numérica.

O `npm run typecheck` (`tsc --noEmit`, com `strict: true`) também passa sem erros.

---

# Seção 4 - 04-database-sql: Consultas SQL na tabela users

## O que eu fiz

Separei a etapa em três arquivos, para rodar em ordem:

- `01-schema.sql` cria o banco `desafio` e a tabela `users`;
- `02-seed.sql` insere Ana, Pedro e Maria com os dados da solicitação;
- `03-queries.sql` tem as duas consultas pedidas.

Testei tudo no MySQL Workbench, conectado ao MariaDB 13 que já vem no Arch Linux. As consultas usam só SQL comum ao MySQL e ao MariaDB, então rodam igual nos dois.

## Como montei a tabela

```sql
CREATE TABLE users (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_created_at (created_at)
);
```

- `id` é a chave primária, com `AUTO_INCREMENT` para o banco gerar o número sozinho em cadastros novos (ORACLE, [2026f]).
- `email` tem `UNIQUE`, porque dois usuários não deveriam ter o mesmo e-mail.
- `created_at` é `DATETIME`, que guarda data e hora. A solicitação só traz a data, então o horário ficou `00:00:00`. O `DEFAULT CURRENT_TIMESTAMP` preenche a data sozinho quando um cadastro novo não informa.
- Criei um índice em `created_at` porque a primeira consulta ordena por essa coluna. Índices servem para encontrar linhas com valores específicos rapidamente, sem ler a tabela inteira (ORACLE, [2026b]). Com três linhas o banco nem usa o índice, já que ler tudo é mais rápido; ele faz diferença quando a tabela cresce.
- O banco usa `utf8mb4`, a codificação Unicode completa do MySQL, que aceita acentos e qualquer outro caractere (ORACLE, [2026e]).

O `01-schema.sql` começa com `DROP TABLE IF EXISTS users`. Assim dá para rodar o script de novo e recomeçar com a tabela vazia.

## Consulta 1: usuários do mais recente para o mais antigo

```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC, id DESC;
```

O `ORDER BY created_at` ordena pela data de cadastro, e o `DESC` inverte a ordem para a data mais recente vir primeiro (ORACLE, [2026d]). O `id DESC` é um desempate: se dois usuários tiverem a mesma data, o de id maior, que foi cadastrado depois, aparece antes. Sem isso, a ordem entre empatados não é garantida.

Listei as colunas no `SELECT` em vez de usar `SELECT *`. Assim a consulta deixa claro o que devolve e não muda de comportamento se alguém acrescentar uma coluna na tabela depois.

Resultado:

| id | name | email | created_at |
|---|---|---|---|
| 3 | Maria | maria@email.com | 2024-02-15 00:00:00 |
| 2 | Pedro | pedro@email.com | 2024-02-01 00:00:00 |
| 1 | Ana | ana@email.com | 2024-01-01 00:00:00 |

## Consulta 2 (bônus): usuários criados por mês

```sql
SELECT DATE_FORMAT(created_at, '%Y-%m') AS mes,
       COUNT(*) AS total_usuarios
FROM users
GROUP BY mes
ORDER BY mes;
```

Ela funciona em três partes:

1. `DATE_FORMAT(created_at, '%Y-%m')` formata a data como ano e mês: `2024-02-15` vira `2024-02` (ORACLE, [2026a]). O `AS mes` dá um nome para esse valor.
2. `GROUP BY mes` junta numa linha só todos os usuários do mesmo mês.
3. `COUNT(*)` conta quantos usuários caíram em cada grupo.

A consulta funciona com o modo `ONLY_FULL_GROUP_BY` ligado, que é o padrão do MySQL. Nesse modo, toda coluna do `SELECT` precisa estar no `GROUP BY` ou dentro de uma função de agregação (ORACLE, [2026c]), e aqui `mes` está no `GROUP BY` e o resto é `COUNT(*)`.

O `ORDER BY mes` deixa os meses em ordem cronológica. Funciona mesmo sendo texto, porque no formato `AAAA-MM` a ordem alfabética é igual à ordem das datas.

Resultado:

| mes | total_usuarios |
|---|---|
| 2024-01 | 1 |
| 2024-02 | 2 |

Uma limitação: meses sem nenhum cadastro não aparecem, porque o `GROUP BY` só cria grupos para os valores que existem na tabela. Para mostrar esses meses com zero, eu precisaria de uma tabela com todos os meses do período e um `LEFT JOIN` com `users`.

---

# Seção 5 - 05-backend-nestjs: API de usuários com NestJS

## O que eu fiz

Uma API em NestJS com duas rotas:

- `GET /users` devolve a lista de usuários em JSON. Ela começa com Ana e Pedro, exatamente como na solicitação.
- `POST /users` recebe `name` e `email` no corpo, cria o usuário com o próximo id e devolve o usuário criado com status 201.

Os dados ficam em memória, num array dentro do service, como a solicitação permite. Quando o servidor reinicia, a lista volta a ter só Ana e Pedro.

O projeto usa o NestJS 12, que gera o código em ESM e traz o Vitest no lugar do Jest (VITEST, [2026]). Por isso os imports internos terminam em `.js`.

## Como organizei os arquivos

```text
05-backend-nestjs/
├── src/
│   ├── main.ts              # sobe o servidor e a documentação Swagger
│   ├── setup-app.ts         # validação global, usada pelo servidor e pelos testes
│   ├── app.module.ts        # módulo raiz, só importa o UsersModule
│   └── users/
│       ├── users.module.ts
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── dto/create-user.dto.ts
│       ├── entities/user.entity.ts
│       ├── users.controller.spec.ts
│       └── users.service.spec.ts
├── test/users.e2e-spec.ts   # testes de ponta a ponta das rotas
└── requests.http            # requisições de exemplo para o VS Code
```

Organizei por domínio: tudo que é de usuário fica na pasta `users/`. Se a API ganhasse, por exemplo, produtos, eles teriam a própria pasta e o próprio módulo, sem mexer em `users/`.

Cada arquivo tem um papel:

- **Module** (`users.module.ts`): junta o controller e o service e diz ao Nest como ligar um ao outro. A documentação do Nest recomenda módulos como a forma de organizar os componentes por funcionalidade (NESTJS, [2026e]). O `AppModule` só importa o `UsersModule`.
- **Controller** (`users.controller.ts`): recebe a requisição HTTP e devolve a resposta (NESTJS, [2026c]). Não tem regra de negócio, só as rotas `@Get()` e `@Post()`.
- **Service** (`users.service.ts`): guarda a lista e tem as regras: listar, gerar o próximo id e não aceitar e-mail repetido.
- **DTO** (`dto/create-user.dto.ts`): descreve o que o `POST` aceita no corpo e como validar cada campo.
- **Entity** (`entities/user.entity.ts`): o formato de um usuário, com `id`, `name` e `email`.

O controller não cria o service com `new`. Ele recebe o service pelo construtor, e o Nest entrega a instância: é a injeção de dependência (NESTJS, [2026g]). Nos testes do controller, isso permite trocar o service por um simulado e testar o controller sozinho.

## Validação

Todo `POST` passa por um `ValidationPipe` global, configurado em `setup-app.ts`. As regras de cada campo são decorators da biblioteca `class-validator` (TYPESTACK, [2026]), e as opções `whitelist` e `forbidNonWhitelisted` fazem a API recusar campos que não estão no DTO (NESTJS, [2026i]).

- `name` é obrigatório, precisa ser texto e pode ter até 100 caracteres;
- `email` é obrigatório e precisa ser um e-mail válido;
- os espaços no começo e no fim são removidos antes da validação, então um nome só com espaços conta como vazio;
- campos que não existem no DTO são recusados. Um `"admin": true` no corpo, por exemplo, dá erro em vez de ser ignorado.

Se algo estiver errado, a API responde 400 com uma mensagem por campo, em português. As mensagens dos campos estão no próprio DTO. A de campo não permitido vem pronta do Nest em inglês, e uma função em `setup-app.ts` traduz.

Um detalhe que apareceu nos testes: quando vários decorators ficam na mesma propriedade, o TypeScript avalia as expressões de cima para baixo, mas executa os decorators de baixo para cima (MICROSOFT, [2026a]). Como a validação para no primeiro erro de cada campo, a regra de campo obrigatório fica por último no DTO. Na ordem contrária, um `POST` sem e-mail respondia "O e-mail pode ter no máximo 255 caracteres".

Se o e-mail já existir, o service lança uma `ConflictException`, uma das exceções HTTP prontas do Nest (NESTJS, [2026d]), e a API responde 409 com "E-mail já cadastrado". A comparação ignora maiúsculas, então `ANA@email.com` também conta como repetido.

## Respostas

| Situação | Status |
|---|---|
| `GET /users` | 200, com a lista |
| `POST /users` com dados válidos | 201, com o usuário criado |
| `POST /users` com dado inválido ou campo extra | 400 |
| `POST /users` com e-mail já cadastrado | 409 |

Por exemplo, um `POST` com este corpo:

```json
{ "name": "Maria", "email": "maria@email.com" }
```

responde 201 com:

```json
{ "id": 3, "name": "Maria", "email": "maria@email.com" }
```

## Documentação com Swagger

Com o servidor rodando, a página `http://localhost:3000/docs` mostra as duas rotas, o formato do corpo e as respostas possíveis. Ela é gerada pelo módulo de OpenAPI do Nest a partir dos decorators do código (NESTJS, [2026f]). Dá para testar as rotas por ali mesmo, no botão "Try it out".

## Decisões

- **Porta:** o servidor lê a porta de `process.env.PORT` e usa 3000 se ela não estiver definida. Não usei o `ConfigModule` do Nest (NESTJS, [2026b]) porque a porta é a única configuração do projeto. Com banco de dados ou chaves de API, eu usaria ele para juntar e validar as variáveis num lugar só.
- **Lista protegida:** o `findAll` devolve uma cópia da lista. Assim, quem chama não consegue alterar os dados guardados no service.
- **Próximo id:** é o maior id da lista mais 1, e não o tamanho da lista. Se um dia existir remoção de usuário, isso evita repetir um id.
- **`setup-app.ts` separado:** o servidor e os testes de ponta a ponta usam a mesma função para configurar a validação. Assim, os testes rodam com a mesma regra da aplicação real.

## Testes

São 14 testes com Vitest, montados com o módulo de testes do Nest (NESTJS, [2026h]):

- 4 no service: lista inicial, cadastro com o próximo id, e-mail repetido e proteção da lista.
- 2 no controller, com o service simulado, para conferir que ele só repassa os dados.
- 8 de ponta a ponta (`test/users.e2e-spec.ts`), que sobem a aplicação e fazem requisições de verdade: o `GET`, o `POST` válido, quatro casos de erro 400, as mensagens em português e o 409.

O lint (Oxlint) e a formatação (Prettier) passam sem avisos.

---

# Seção 6 - Estratégia de commits

## Como separei os commits

Segui duas regras. A primeira: cada commit traz uma etapa completa e funcionando, com os testes passando. A segunda: as mensagens seguem o padrão Conventional Commits, no formato `tipo(escopo): descrição` (CONVENTIONAL COMMITS, [2026]). O tipo diz a natureza da mudança (`feat` para funcionalidade nova, `chore` para manutenção, `docs` para documentação) e o escopo diz qual parte do projeto mudou. Escrevi as descrições em português e no presente ("adiciona", "implementa"), curtas o bastante para caber numa linha do `git log --oneline`.

| Commit | O que entrou |
|---|---|
| `chore: inicializa repositório com README, EXPLICACOES.md e configurações base` | A estrutura do repositório, sem nenhum código das etapas |
| `feat(html-css): cria formulário de cadastro acessível com validação` | Seção 1 |
| `feat(vue): implementa lista de tarefas com Composition API e filtros` | Seção 2 |
| `feat(typescript): adiciona filtro tipado de usuários e corrige etapas 1 e 2` | Seção 3 e ajustes nas seções 1 e 2 |
| `chore(vue): sincroniza package-lock.json com o package.json` | Só o arquivo de dependências travadas da seção 2 |
| `feat(sql): adiciona schema, dados de exemplo e consultas de usuários` | Seção 4 |
| `feat(api): implementa GET e POST /users com validação` | Seção 5 |
| `chore: padroniza descrições e textos das etapas 3 e 5` | Ajustes de texto no código das seções 3 e 5, sem mudar comportamento |
| `docs: adiciona estratégia de commits, organização de projeto e cenário de login lento` | Revisão das explicações e do README |

## Por que separei assim

- **Para mostrar a evolução.** Quem lê o histórico vê o projeto crescer etapa por etapa e pode abrir um commit para ver só aquela parte, sem o resto misturado.
- **Para separar manutenção de funcionalidade.** O commit do `package-lock.json` não muda o comportamento de nada. Deixá-lo sozinho, como `chore`, evita que ele pareça parte de uma funcionalidade.
- **Para facilitar desfazer e investigar.** Se uma etapa quebrar algo, dá para desfazer só ela com `git revert`. E, para achar o commit em que um erro apareceu, o `git bisect` faz uma busca binária no histórico (GIT, [2026]). Isso só funciona bem quando cada commit deixa o projeto funcionando.

## O que eu faria diferente

O commit da seção 3 também levou correções das seções 1 e 2. Hoje eu separaria essas correções em commits próprios, como `fix(html-css)` e `fix(vue)`, para cada commit tratar de um assunto só e a mensagem descrever tudo o que ele contém.

---

# Seção 7 - Organização de um projeto fullstack

## Visão geral

Eu separaria o frontend e o backend em duas pastas na raiz do repositório, cada uma com o seu `package.json`, e deixaria na raiz um README explicando como rodar as duas partes:

```text
projeto/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

Assim cada lado tem as próprias dependências e pode ser publicado separadamente. As duas partes conversam só pela API.

## Frontend (Vue 3)

```text
frontend/
├── public/               # arquivos servidos como estão (favicon, robots.txt)
├── src/
│   ├── assets/           # estilos globais, fontes e imagens
│   ├── components/       # componentes reutilizáveis
│   │   └── ui/           # peças genéricas: botão, campo, modal
│   ├── composables/      # lógica reutilizável com estado (useAuth, useTodoList)
│   ├── views/            # uma tela por rota (LoginView.vue, HomeView.vue)
│   ├── router/           # rotas do Vue Router
│   ├── stores/           # estado global com Pinia
│   ├── services/         # chamadas HTTP para a API
│   ├── types/            # tipos TypeScript compartilhados
│   ├── App.vue
│   └── main.ts
├── .env.example          # variáveis necessárias, sem valores reais
├── vite.config.ts
└── tsconfig.json
```

Os motivos:

- **`views/` separado de `components/`.** Uma view é uma tela inteira, ligada a uma rota. Um componente é uma peça que aparece em várias telas. Separando os dois, fica claro o que é página e o que é reaproveitável.
- **`router/` e `stores/`.** O Vue Router é o roteador oficial do Vue (VUE.JS, [2026h]), e o Pinia é a biblioteca de estado global recomendada pela documentação (VUE.JS, [2026i]). As duas opções já aparecem na criação de um projeto com o `create-vue`. Uso o Pinia só para o que várias telas precisam ao mesmo tempo, como o usuário logado.
- **`composables/`.** A lógica fica fora dos componentes e pode ser testada sem montar nenhuma tela (VUE.JS, [2026a]). Foi a mesma escolha que fiz na seção 2.
- **`services/`.** Todas as chamadas à API ficam num lugar só. Se o endereço da API ou o jeito de enviar o token mudar, altero um arquivo, não dez telas.
- **`types/`.** Os formatos dos dados, como `User` e `Todo`, ficam declarados uma vez e são usados em todo o frontend.

Os testes ficariam perto do código testado, numa pasta `__tests__` dentro de `components/` e de `composables/`, como já fiz na seção 2. Se o projeto crescer muito, eu passaria a organizar por funcionalidade (`features/auth/`, `features/users/`), cada uma com os seus componentes, composables e services. Para um projeto que está começando, separar por tipo de arquivo é mais simples de entender.

## Backend (NestJS)

```text
backend/
├── src/
│   ├── main.ts               # sobe a aplicação
│   ├── app.module.ts         # módulo raiz, só importa os outros
│   ├── config/               # leitura e validação das variáveis de ambiente
│   ├── common/               # usado por vários módulos: filtros, guards, pipes, decorators
│   ├── database/             # conexão com o banco e migrations
│   └── modules/
│       ├── auth/             # login e emissão de token
│       └── users/
│           ├── dto/
│           ├── entities/
│           ├── users.controller.ts
│           ├── users.service.ts
│           ├── users.module.ts
│           └── users.service.spec.ts
├── test/                     # testes de ponta a ponta
├── .env.example
└── tsconfig.json
```

Os motivos:

- **Um módulo por funcionalidade.** Cada módulo junta o seu controller, service, DTOs e entidades. É a organização que a documentação do Nest recomenda (NESTJS, [2026e]) e a mesma que usei na seção 5. Dá para entender e testar um módulo sem conhecer os outros.
- **Controller e service com papéis separados.** O controller só cuida da parte HTTP, e o service guarda as regras de negócio. O Nest entrega o service ao controller por injeção de dependência (NESTJS, [2026g]), o que permite testar cada um isoladamente.
- **`common/`.** Um filtro de exceção ou um guard de autenticação usado por vários módulos fica num lugar só, em vez de ser copiado em cada um.
- **`config/`.** Com o `ConfigModule`, as variáveis de ambiente são lidas e validadas quando a aplicação sobe (NESTJS, [2026b]). Se faltar alguma, a aplicação nem inicia, em vez de falhar no meio de uma requisição. Na seção 5 não usei porque a única configuração era a porta. Num projeto com banco e autenticação, usaria desde o começo.
- **`.env.example` no repositório e `.env` no `.gitignore`.** Quem baixa o projeto sabe quais variáveis precisa criar, e as senhas reais nunca vão para o Git.
- **Testes.** Os unitários ficam ao lado do arquivo testado, e os de ponta a ponta, em `test/`, como o Nest já cria por padrão.

---

# Seção 8 - Tela de login lenta

## Primeiras verificações

Antes de mudar qualquer código, eu tentaria descobrir em que parte está a demora: no carregamento da página, na resposta da API ou no banco de dados.

1. **Reproduzir e medir.** Abriria a tela com as ferramentas de desenvolvedor do navegador, na aba Network, com o cache desativado. Ela mostra cada arquivo e requisição da página, com o tamanho e o tempo de cada um (GOOGLE, [2026b]). Rodaria também o Lighthouse no modo de performance, que aponta arquivos grandes demais e recursos que bloqueiam a exibição da página.
2. **Se a demora estiver no frontend.** Veria se a tela de login baixa o JavaScript do sistema inteiro, se há imagens ou fontes pesadas e se a tela espera alguma requisição antes de aparecer, como buscar configurações ou dados do usuário antes de mostrar o formulário.
3. **Se a demora estiver numa requisição à API.** Veria os logs do servidor e o tempo de resposta da rota. Dentro dela, conferiria a consulta ao banco: com o `EXPLAIN`, dá para ver se a busca pelo e-mail usa um índice ou lê a tabela inteira (ORACLE, [2026b]). Se a demora for ao enviar o formulário, também olharia o custo do hash da senha e as chamadas a serviços externos, como captcha ou login social.
4. **Entender o contexto.** A lentidão acontece para todo mundo ou só em uma rede, um aparelho ou um navegador? Começou depois de alguma atualização? Se começou depois de uma mudança, o `git bisect` ajuda a encontrar o commit responsável (GIT, [2026]).

## Duas soluções

**1. Carregar só o código da tela de login.** Com o Vue Router, cada rota pode carregar a sua tela por `import()` dinâmico. O build gera um arquivo separado para cada tela, e o navegador só baixa o código da área logada depois do login (VUE ROUTER, [2026]):

```ts
const routes = [
  { path: '/login', component: () => import('@/views/LoginView.vue') },
  { path: '/', component: () => import('@/views/HomeView.vue') },
];
```

Junto com isso, comprimiria as imagens e carregaria só as fontes e os pesos que a tela usa.

**2. Deixar a resposta do backend mais rápida.** Se a demora estiver na API, criaria um índice na coluna usada na busca do login, normalmente o e-mail, para o banco achar o usuário sem ler a tabela inteira (ORACLE, [2026b]). Na seção 4, o `UNIQUE` da coluna `email` já cria esse índice. Se a tela busca dados que quase nunca mudam, como configurações ou textos, guardaria essas respostas em cache com o módulo de cache do Nest, para não consultar o banco a cada acesso (NESTJS, [2026a]).

Depois de qualquer mudança, mediria de novo do mesmo jeito, para confirmar que o tempo realmente caiu.

# Uso de Ferramentas de IA

## Quais ferramentas usei

Usei duas ferramentas:

- **Antigravity**, o editor com agente de IA do Google, com o modelo Gemini 3.8 Flash. Usei o Gemini só dentro do Antigravity. Foi nele que gerei a maior parte do código e dos primeiros textos das seções 1, 2 e 3.
- **Claude**. Usei principalmente para validar e testar cada etapa: rodar os testes, conferir o repositório num clone novo depois de cada push, auditar as páginas no Lighthouse e apontar o que precisava de correção. Também foi com ele que planejei as etapas e as mensagens de commit, que me orientei na seção 4 (feita à mão por mim no MySQL Workbench), que implementei a API da seção 5 e que revisei os textos de explicação.

## Por que dividi o trabalho assim

Minha assinatura do Claude não é a mais avançada, e eu não queria gastar tokens sem necessidade em tarefas simples. Por isso deixei a geração das etapas menos complexas com o Gemini, no Antigravity, e guardei o Claude para validar e testar, onde um erro custa mais.

Antes de decidir, consultei o ranking de agentes da Arena (ARENA, 2026). Na data da consulta, o Gemini 3.8 Flash (High) estava em 16º lugar, com custo mediano de US$ 0,81 por tarefa. O Claude Opus 5.5 (Max) estava em 1º, com US$ 6,20 por tarefa, e o Claude Sonnet 5.5 (Max) em 5º, com US$ 4,06. Para tarefas de desenvolvimento menos complexas, avaliei que o desempenho do Gemini seria suficiente e que o custo menor compensava.

Em um projeto profissional, para um cliente final, eu não usaria o Antigravity. Usaria só o Claude, ou o Claude o máximo possível, porque é a ferramenta que considero mais adequada para desenvolver com IA, e o mesmo ranking coloca os modelos dele à frente em qualidade. Aqui, como o objetivo também era controlar o gasto, tomei a liberdade de usar o Gemini com mais frequência.

## Skills que usei

Antes deste projeto, eu já mantinha um catálogo de skills de IA para desenvolvimento, que fui montando com o que pesquisava e testava. Uso skills por três motivos: gastar menos tokens, reduzir erros e alucinações do modelo e ter mais segurança de que cada tarefa está sendo feita do jeito certo, principalmente nas tecnologias em que o meu conhecimento ainda tem lacunas.

| Seção | Skills |
|---|---|
| 1. HTML + CSS | neumorphism (SKILLS UI, [2026]) |
| 2. Vue 3 | vue-expert, do pacote fullstack-dev-skills (JEFFALLAN, [2026]), e neumorphism |
| 3. TypeScript | typescript-pro, do pacote fullstack-dev-skills |
| 4. SQL | nenhuma: fiz a etapa à mão no MySQL Workbench, orientado pelo Claude para chegar ao resultado pretendido|
| 5. NestJS | nestjs-expert, do pacote fullstack-dev-skills |

- **neumorphism**: guia de estilo visual, com as regras de sombra, cor e espaçamento do neumorfismo.
- **vue-expert, typescript-pro e nestjs-expert**: boas práticas de cada tecnologia, que o agente carrega quando a tarefa é sobre ela. A nestjs-expert, por exemplo, exige validação com DTO, exceções tipadas, documentação Swagger e testes do service, e usei a lista de regras dela para revisar a API.

## Um exemplo concreto

Na API da seção 5, um `POST` sem e-mail respondia "O e-mail pode ter no máximo 255 caracteres", uma mensagem sem sentido para um campo vazio. Esse caso apareceu numa bateria de testes manuais com corpos inválidos que pedi ao Claude. Investigando com ele, aprendi que, quando há vários decorators na mesma propriedade, o TypeScript executa os decorators de baixo para cima (MICROSOFT, [2026a]). Como a validação para no primeiro erro de cada campo, a regra mais básica, a de campo obrigatório, precisava ficar por último. Mudei a ordem e acrescentei um teste para esse caso.

## MCP, agentes e skills

O MCP (Model Context Protocol) é um padrão para conectar modelos de IA a ferramentas e dados externos (IBM, [2026]). Ele funciona como um tradutor universal: o modelo não precisa saber como cada ferramenta funciona por dentro, só o que ela faz e quais parâmetros ela pede.

Pelo que estudei, a arquitetura tem três partes:

- **Host**: o aplicativo onde a IA é usada, como um editor ou um chat. Ele decide quais conexões são permitidas e pede autorização antes de acessar dados.
- **Cliente MCP**: o host cria um cliente para cada servidor conectado. O cliente descobre o que o servidor oferece, leva os pedidos da IA até ele e traz as respostas. Como cada servidor tem o seu cliente, um não vê as mensagens nem as permissões do outro.
- **Servidor MCP**: o lado que conhece o sistema externo, como um banco de dados, uma API ou um calendário. Ele declara suas ferramentas, recursos e prompts, recebe pedidos no formato JSON-RPC e executa cada um com as próprias credenciais.

As skills, que usei neste projeto, resolvem outro problema. Uma skill é um pacote de instruções, com um arquivo principal e referências, que o agente carrega quando a tarefa pede. Na minha leitura, o MCP dá ao agente acesso a ferramentas e dados, e a skill ensina como fazer uma tarefa bem.

## Como continuo aprendendo

O meu conhecimento nas tecnologias pedidas ainda tem lacunas, e trabalho para fechar cada uma delas. Participo de uma mentoria com um programador profissional, focada na stack JavaScript, sempre a partir das documentações oficiais, como as citadas neste arquivo.

Para fixar o conteúdo, uso duas técnicas de estudo bem avaliadas pela pesquisa em psicologia cognitiva: a prática distribuída, com revisões espaçadas ao longo do tempo, e a prática de recuperação, em que relembro conceitos e resolvo exercícios de memória, com autoavaliação. As duas aparecem entre as técnicas de maior utilidade na revisão de Dunlosky et al. (2013).

Também foi por isso que citei as documentações oficiais ao longo deste arquivo. Em algumas etapas eu ainda não tenho domínio do assunto, então deixei as fontes registradas para voltar a elas depois: estudar este documento com calma, abrir cada referência e aprender, com profundidade, as habilidades usadas em cada etapa.

Vou continuar esse processo. Também aprendo muito resolvendo problemas reais, como neste projeto, e quero seguir crescendo dessa forma, na prática do dia a dia de um time de desenvolvimento.

---

# Referências

ARENA. **Agent Leaderboard**. Arena, 2026. Disponível em: https://arena.ai/leaderboard/agent. Acesso em: 23 out. 2026.

CONVENTIONAL COMMITS. **Conventional Commits 1.0.0**. [2026]. Disponível em: https://www.conventionalcommits.org/pt-br/v1.0.0/. Acesso em: 23 out. 2026.

DUNLOSKY, John *et al*. Improving students' learning with effective learning techniques: promising directions from cognitive and educational psychology. **Psychological Science in the Public Interest**, v. 14, n. 1, p. 4-58, 2013. DOI: https://doi.org/10.1177/1529100612453266.

GIT. **git-bisect**. Git Documentation, [2026]. Disponível em: https://git-scm.com/docs/git-bisect. Acesso em: 23 out. 2026.

GOOGLE. **Document does not have a meta description**. Chrome for Developers, [2026a]. Disponível em: https://developer.chrome.com/docs/lighthouse/seo/meta-description. Acesso em: 23 out. 2026.

GOOGLE. **Inspect network activity**. Chrome for Developers, [2026b]. Disponível em: https://developer.chrome.com/docs/devtools/network. Acesso em: 23 out. 2026.

GOOGLE. **Lighthouse accessibility score**. Chrome for Developers, [2026c]. Disponível em: https://developer.chrome.com/docs/lighthouse/accessibility/scoring. Acesso em: 23 out. 2026.

GOOGLE. **Robots.txt Introduction and Guide**. Google Search Central, [2026d]. Disponível em: https://developers.google.com/search/docs/crawling-indexing/robots/intro. Acesso em: 23 out. 2026.

GOOGLE. **What is URL Canonicalization**. Google Search Central, [2026e]. Disponível em: https://developers.google.com/search/docs/crawling-indexing/canonicalization. Acesso em: 23 out. 2026.

IBM. **O que é MCP (Model Context Protocol)?**. IBM Think, [2026]. Disponível em: https://www.ibm.com/br-pt/think/topics/model-context-protocol. Acesso em: 23 out. 2026.

JEFFALLAN. **Claude Skills**: 67 specialized skills for full-stack developers. GitHub, [2026]. Disponível em: https://github.com/jeffallan/claude-skills. Acesso em: 23 out. 2026.

MICROSOFT. **Decorators**. TypeScript Documentation, [2026a]. Disponível em: https://www.typescriptlang.org/docs/handbook/decorators.html. Acesso em: 23 out. 2026.

MICROSOFT. **Keyof Type Operator**. TypeScript Documentation, [2026b]. Disponível em: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html. Acesso em: 23 out. 2026.

MICROSOFT. **Mapped Types**. TypeScript Documentation, [2026c]. Disponível em: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html. Acesso em: 23 out. 2026.

MICROSOFT. **Object Types**. TypeScript Documentation, [2026d]. Disponível em: https://www.typescriptlang.org/docs/handbook/2/objects.html. Acesso em: 23 out. 2026.

MOZILLA. **:target**. MDN Web Docs, [2026a]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target. Acesso em: 23 out. 2026.

MOZILLA. **:user-invalid**. MDN Web Docs, [2026b]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid. Acesso em: 23 out. 2026.

MOZILLA. **&lt;form&gt;: The Form element**. MDN Web Docs, [2026c]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form. Acesso em: 23 out. 2026.

MOZILLA. **Array.prototype.slice()**. MDN Web Docs, [2026d]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice. Acesso em: 23 out. 2026.

MOZILLA. **ARIA: aria-live attribute**. MDN Web Docs, [2026e]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live. Acesso em: 23 out. 2026.

MOZILLA. **prefers-reduced-motion**. MDN Web Docs, [2026f]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion. Acesso em: 23 out. 2026.

MOZILLA. **Using CSS custom properties (variables)**. MDN Web Docs, [2026g]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties. Acesso em: 23 out. 2026.

MOZILLA. **Using HTML form validation and the Constraint Validation API**. MDN Web Docs, [2026h]. Disponível em: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation. Acesso em: 23 out. 2026.

NESTJS. **Caching**. NestJS Documentation, [2026a]. Disponível em: https://docs.nestjs.com/techniques/caching. Acesso em: 23 out. 2026.

NESTJS. **Configuration**. NestJS Documentation, [2026b]. Disponível em: https://docs.nestjs.com/techniques/configuration. Acesso em: 23 out. 2026.

NESTJS. **Controllers**. NestJS Documentation, [2026c]. Disponível em: https://docs.nestjs.com/controllers. Acesso em: 23 out. 2026.

NESTJS. **Exception filters**. NestJS Documentation, [2026d]. Disponível em: https://docs.nestjs.com/exception-filters. Acesso em: 23 out. 2026.

NESTJS. **Modules**. NestJS Documentation, [2026e]. Disponível em: https://docs.nestjs.com/modules. Acesso em: 23 out. 2026.

NESTJS. **OpenAPI (Swagger)**. NestJS Documentation, [2026f]. Disponível em: https://docs.nestjs.com/openapi/introduction. Acesso em: 23 out. 2026.

NESTJS. **Providers**. NestJS Documentation, [2026g]. Disponível em: https://docs.nestjs.com/providers. Acesso em: 23 out. 2026.

NESTJS. **Testing**. NestJS Documentation, [2026h]. Disponível em: https://docs.nestjs.com/fundamentals/testing. Acesso em: 23 out. 2026.

NESTJS. **Validation**. NestJS Documentation, [2026i]. Disponível em: https://docs.nestjs.com/techniques/validation. Acesso em: 23 out. 2026.

OPENJS FOUNDATION. **Test runner**. Node.js Documentation, [2026]. Disponível em: https://nodejs.org/api/test.html. Acesso em: 23 out. 2026.

ORACLE. **Date and Time Functions**. MySQL 8.4 Reference Manual, [2026a]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/date-and-time-functions.html. Acesso em: 23 out. 2026.

ORACLE. **How MySQL Uses Indexes**. MySQL 8.4 Reference Manual, [2026b]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/mysql-indexes.html. Acesso em: 23 out. 2026.

ORACLE. **MySQL Handling of GROUP BY**. MySQL 8.4 Reference Manual, [2026c]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html. Acesso em: 23 out. 2026.

ORACLE. **Sorting Rows**. MySQL 8.4 Reference Manual, [2026d]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/sorting-rows.html. Acesso em: 23 out. 2026.

ORACLE. **Unicode Character Sets**. MySQL 8.4 Reference Manual, [2026e]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-sets.html. Acesso em: 23 out. 2026.

ORACLE. **Using AUTO_INCREMENT**. MySQL 8.4 Reference Manual, [2026f]. Disponível em: https://dev.mysql.com/doc/refman/8.4/en/example-auto-increment.html. Acesso em: 23 out. 2026.

SKILLS UI. **Neumorphism**. Skills UI, [2026]. Disponível em: https://www.skillsui.app/skills/neumorphism. Acesso em: 23 out. 2026.

TYPESTACK. **class-validator**. GitHub, [2026]. Disponível em: https://github.com/typestack/class-validator. Acesso em: 23 out. 2026.

VITEST. **Getting Started**. Vitest, [2026]. Disponível em: https://vitest.dev/guide/. Acesso em: 23 out. 2026.

VUE ROUTER. **Lazy Loading Routes**. Vue Router, [2026]. Disponível em: https://router.vuejs.org/guide/advanced/lazy-loading. Acesso em: 23 out. 2026.

VUE.JS. **Composables**. Vue.js Guide, [2026a]. Disponível em: https://vuejs.org/guide/reusability/composables.html. Acesso em: 23 out. 2026.

VUE.JS. **Composition API: Lifecycle Hooks**. Vue.js API, [2026b]. Disponível em: https://vuejs.org/api/composition-api-lifecycle. Acesso em: 23 out. 2026.

VUE.JS. **Computed Properties**. Vue.js Guide, [2026c]. Disponível em: https://vuejs.org/guide/essentials/computed.html. Acesso em: 23 out. 2026.

VUE.JS. **List Rendering**. Vue.js Guide, [2026d]. Disponível em: https://vuejs.org/guide/essentials/list. Acesso em: 23 out. 2026.

VUE.JS. **Props**. Vue.js Guide, [2026e]. Disponível em: https://vuejs.org/guide/components/props. Acesso em: 23 out. 2026.

VUE.JS. **Reactivity API: Utilities**. Vue.js API, [2026f]. Disponível em: https://vuejs.org/api/reactivity-utilities.html. Acesso em: 23 out. 2026.

VUE.JS. **Reactivity Fundamentals**. Vue.js Guide, [2026g]. Disponível em: https://vuejs.org/guide/essentials/reactivity-fundamentals.html. Acesso em: 23 out. 2026.

VUE.JS. **Routing**. Vue.js Guide, [2026h]. Disponível em: https://vuejs.org/guide/scaling-up/routing.html. Acesso em: 23 out. 2026.

VUE.JS. **State Management**. Vue.js Guide, [2026i]. Disponível em: https://vuejs.org/guide/scaling-up/state-management.html. Acesso em: 23 out. 2026.

VUE.JS. **Watchers**. Vue.js Guide, [2026j]. Disponível em: https://vuejs.org/guide/essentials/watchers.html. Acesso em: 23 out. 2026.

W3C. **Web Content Accessibility Guidelines (WCAG) 2.2**. W3C, 2023. Disponível em: https://www.w3.org/TR/WCAG22/. Acesso em: 23 out. 2026.
