# Seção 1 - 01-html-css: Formulário de cadastro

## O que eu fiz

Uma página de cadastro com os campos Nome, E-mail e Senha e um botão "Criar conta". Fiz tudo só com HTML e CSS, sem JavaScript. Como o teste era de HTML + CSS, quis ver até onde dava para chegar com o que o navegador já oferece.

O visual segue o estilo neumórfico: o cartão parece saltar da tela, os campos parecem afundados e o botão tem efeito de clique.

## Como organizei o HTML

- `<html lang="pt-BR">`, viewport, `<title>`, meta description, `robots` e tags Open Graph no `<head>`. Não coloquei URL canônica porque a página ainda não tem um endereço publicado. Um canonical apontando para um domínio inventado diria ao Google que a página verdadeira está em outro lugar.
- A estrutura usa `<header>`, `<main>`, `<section>` e `<footer>`, com um único `<h1>` ("Criar nova conta").
- Cada `<label>` tem `for` ligado ao `id` do campo, e cada mensagem de erro fica ligada ao campo pelo `aria-describedby`.

## Como funciona a validação

Usei os atributos nativos: `required` nos três campos, `type="email"` no e-mail e `minlength="8"` na senha. Não coloquei `novalidate`, então o próprio navegador bloqueia o envio e mostra o aviso quando algo está errado.

Para as mensagens embaixo de cada campo, usei a pseudo-classe `:user-invalid`. Ela só marca o campo depois que a pessoa interage com ele e sai deixando um valor inválido. Com `:invalid`, os campos já apareceriam em vermelho assim que a página abre. O erro aparece com borda vermelha, texto e um ícone ⚠, para não depender só da cor.

## A mensagem de sucesso sem JavaScript

O formulário tem `action="#success-message"`. Quando tudo está válido e a pessoa envia, o navegador muda o endereço para `#success-message`, e a regra `#success-message:target` no CSS mostra o alerta. O link "Fazer novo cadastro" volta para `#` e esconde a mensagem.

Um cuidado: os campos não têm o atributo `name`. Com `method="GET"`, todo campo com `name` vai parar na URL, inclusive a senha. Sem `name`, o envio só troca o hash e nenhum dado aparece no endereço.

## Como organizei o CSS

O `css/styles.css` está dividido em blocos, nesta ordem:

1. Tokens: variáveis no `:root` com cores, sombras, bordas e transições.
2. Base: reset, `box-sizing` e tipografia.
3. Layout: estrutura da página, pensada primeiro para celular, com ajuste a partir de 640px.
4. Componentes: cartão, campos, botão e alerta.
5. Estados: `:hover`, `:focus-visible`, `:user-invalid`, `:target` e `prefers-reduced-motion`, para quem prefere menos animação.

O neumorfismo costuma ter pouco contraste, então deixei o efeito nas superfícies e usei cores fortes no texto. O fundo é `#e0e5ec`. Os textos usam `#111827` e `#2d3748`, e o botão é `#5e35b1` com texto branco, tudo acima do mínimo de 4.5:1 do WCAG AA.

## Lighthouse

Notas no Lighthouse 13.5 (iguais no modo mobile e desktop):

| Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

---

# Seção 2 - 02-vue3-todo: Lista de tarefas com Vue 3

## O que eu fiz

Uma lista de tarefas com Vue 3, Composition API (`<script setup lang="ts">`), TypeScript e Vite. Dá para adicionar, concluir, remover e filtrar tarefas entre todas, pendentes e concluídas.

Além do pedido, coloquei três coisas: um botão para limpar as concluídas de uma vez, paginação de 5 tarefas por página e salvamento no `localStorage`, para as tarefas continuarem lá depois de recarregar a página.

## Como organizei os componentes

A ideia foi deixar cada componente com uma função só. Os dados descem por props e as ações sobem por eventos.

- `App.vue`: monta a página, usa o composable e repassa os dados para os componentes. Também cuida da paginação e da mensagem de lista vazia.
- `TodoForm.vue`: campo e botão para adicionar. Não aceita texto vazio ou só com espaços, mostra o erro e devolve o foco ao campo. Emite `add-todo`.
- `TodoItem.vue`: uma tarefa da lista, com o botão de concluir e o de excluir. Emite `toggle` e `remove`.
- `TodoFilters.vue`: os botões de filtro com a contagem de cada um e o botão de limpar concluídas. Emite `change-filter` e `clear-completed`.
- `composables/useTodoList.ts`: toda a lógica fica aqui (estado, filtros, paginação e salvamento). Assim os componentes só cuidam da tela, e a lógica pode ser testada sem montar nenhum componente.
- `types/todo.ts`: o tipo `TodoItem` e o tipo do filtro (`'all' | 'pending' | 'completed'`).

## Primitivas da Composition API que usei

- `ref()`: para a lista de tarefas, o filtro atual e a mensagem lida pelo leitor de tela. Também usei para pegar o `<input>` do formulário e dar foco nele.
- `reactive()`: para dados que andam juntos, como o texto e a mensagem de erro do formulário, e a página atual com a quantidade de itens por página.
- `toRefs()`: no retorno do composable. Se eu desestruturasse o objeto do `reactive()` direto, perderia a reatividade. Com `toRefs()`, `currentPage` e `itemsPerPage` continuam reativos depois de desestruturados.
- `computed()`: para a lista filtrada, o total de páginas, as tarefas da página atual e os contadores. O `computed` guarda o resultado e só recalcula quando algo que ele usa muda, em vez de refazer a conta a cada renderização.
- `watch()`: para efeitos colaterais. Um salva a lista no `localStorage` sempre que ela muda. Outro volta para a página 1 quando o filtro muda. Um terceiro corrige a página atual se ela deixar de existir depois de uma exclusão.
- `defineProps()` e `defineEmits()`: para declarar, com tipos, o que cada componente recebe e o que ele avisa ao pai.
- `onMounted()`: para dar foco no campo de nova tarefa quando a página carrega.

## Paginação

A página atual é recortada com `slice(inicio, inicio + itensPorPagina)`. Usei `slice()` e não `splice()` porque o `slice()` não altera o array original, então a lista reativa fica intacta.

## Acessibilidade e SEO

- O `index.html` tem `lang="pt-BR"`, `<title>`, meta description e tags Open Graph. Sem canonical, pelo mesmo motivo da seção 1.
- Os botões de filtro usam `aria-pressed`, e o botão de concluir usa `role="checkbox"` com `aria-checked`.
- Os botões de excluir e concluir têm `aria-label` com o nome da tarefa, para o leitor de tela dizer qual tarefa vai ser afetada.
- Uma área com `aria-live` anuncia quando uma tarefa é adicionada, concluída ou removida.
- Os botões de concluir e excluir têm borda colorida (roxa e vermelha), porque no neumorfismo puro eles ficavam com cara de que não eram clicáveis.

## Testes

São 13 testes com Vitest, todos passando:

- 8 no composable (`useTodoList.spec.ts`): adicionar, recusar título em branco, concluir, excluir, filtrar, limpar concluídas e paginar.
- 5 de integração (`TodoApp.spec.ts`), que montam o app e simulam o uso na tela.

O `type-check` e o lint (Oxlint e ESLint) também passam sem erros.

## Lighthouse

Medi no build de produção (`npm run build` e `npm run preview`), porque o modo de desenvolvimento sempre tira nota pior. Na primeira rodada, acessibilidade deu 96 e SEO deu 91, e corrigi três coisas:

- As tarefas concluídas tinham `opacity: 0.85`, o que deixava o texto com contraste de 4.25:1, abaixo do mínimo de 4.5:1. Tirei a opacidade; o texto riscado e a cor mais clara já mostram que a tarefa foi concluída.
- O botão "Limpar concluídas" tinha um `aria-label` diferente do texto visível. Quem usa comando de voz fala o que vê na tela, então removi o `aria-label` e deixei o próprio texto do botão como nome.
- Faltava o `robots.txt`. Sem ele, o servidor devolvia o `index.html` no lugar, e o Lighthouse acusava arquivo inválido. Criei `public/robots.txt` liberando o acesso.

Depois das correções:

| Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

---

# Seção 3 - 03-typescript: Manipulação e tipagem com TypeScript

## O que eu fiz

Criei um módulo em TypeScript com o filtro de usuários pedido no teste e uma versão genérica para o bônus. O código roda no terminal com Node.js e `tsx`.

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

Usei o modificador `readonly` nos campos e no array recebido (`readonly User[]`). Assim as funções não conseguem alterar os dados originais por engano. Se alguém tentar fazer `user.age = 30` ou `users.push(...)`, o TypeScript acusa erro já no editor, antes de rodar.

## A função principal e o critério estrito

A função `getUserNamesOlderThan23` recebe a lista e encadeia um `.filter()` seguido de um `.map()`:

```ts
export function getUserNamesOlderThan23(userList: readonly User[]): string[] {
  return userList
    .filter((user) => user.age > 23)
    .map((user) => user.name);
}
```

O `filter` separa quem tem mais de 23 anos e o `map` pega só o nome. Usei `>` e não `>=` porque o enunciado diz "mais de 23": quem tem exatamente 23 anos fica de fora.

## O bônus com tipo genérico e NumericKeys

Para o bônus, não usei só `keyof T`, porque isso aceitaria qualquer campo, inclusive `name`. Criei um tipo que pega apenas as chaves com valor numérico:

```ts
export type NumericKeys<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];
```

Esse tipo mapeado passa por cada propriedade de `T`. Se o valor é `number`, guarda o nome da chave; se não é, guarda `never`. No final, `[keyof T]` junta tudo numa união, e o `never` some dela, sobrando só as chaves numéricas. O `-?` tira o "opcional" das propriedades para o `undefined` não atrapalhar a comparação.

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

Usei o test runner que já vem no Node.js (`node:test` e `node:assert/strict`), sem instalar framework de teste. São 10 testes, que cobrem:

- O retorno exato `['Ana', 'Pedro']` para os dados fornecidos.
- A exclusão do valor limiar (idade 23).
- O comportamento com arrays vazios e listas onde ninguém cumpre o critério.
- A função genérica com usuários e com outro tipo de objeto (transações).
- A rejeição estática em tempo de compilação com `@ts-expect-error` ao passar uma propriedade não numérica.

O `npm run typecheck` (`tsc --noEmit`, com `strict: true`) também passa sem erros.

---

# Seção 4 - 04-database-sql: Consultas SQL na tabela users

## O que eu fiz

Separei a etapa em três arquivos, para rodar em ordem:

- `01-schema.sql` cria o banco `desafio` e a tabela `users`;
- `02-seed.sql` insere Ana, Pedro e Maria com os dados do enunciado;
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

- `id` é a chave primária, com `AUTO_INCREMENT` para o banco gerar o número sozinho em cadastros novos.
- `email` tem `UNIQUE`, porque dois usuários não deveriam ter o mesmo e-mail.
- `created_at` é `DATETIME`, que guarda data e hora. O enunciado só traz a data, então o horário ficou `00:00:00`. O `DEFAULT CURRENT_TIMESTAMP` preenche a data sozinho quando um cadastro novo não informa.
- Criei um índice em `created_at` porque a primeira consulta ordena por essa coluna. Com três linhas o banco nem usa o índice, já que ler tudo é mais rápido. Ele faz diferença quando a tabela cresce.
- O banco usa `utf8mb4`, que aceita acentos e qualquer outro caractere.

O `01-schema.sql` começa com `DROP TABLE IF EXISTS users`. Assim dá para rodar o script de novo e recomeçar com a tabela vazia.

## Consulta 1: usuários do mais recente para o mais antigo

```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC, id DESC;
```

O `ORDER BY created_at` ordena pela data de cadastro, e o `DESC` inverte a ordem para a data mais recente vir primeiro. O `id DESC` é um desempate: se dois usuários tiverem a mesma data, o de id maior, que foi cadastrado depois, aparece antes. Sem isso, a ordem entre empatados não é garantida.

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

1. `DATE_FORMAT(created_at, '%Y-%m')` transforma a data em ano e mês: `2024-02-15` vira `2024-02`. O `AS mes` dá um nome para esse valor.
2. `GROUP BY mes` junta numa linha só todos os usuários do mesmo mês.
3. `COUNT(*)` conta quantos usuários caíram em cada grupo.

O `ORDER BY mes` deixa os meses em ordem cronológica. Funciona mesmo sendo texto, porque no formato `AAAA-MM` a ordem alfabética é igual à ordem das datas.

Resultado:

| mes | total_usuarios |
|---|---|
| 2024-01 | 1 |
| 2024-02 | 2 |

Uma limitação: meses sem nenhum cadastro não aparecem, porque o `GROUP BY` só cria grupos para os valores que existem na tabela. Para mostrar esses meses com zero, eu precisaria de uma tabela com todos os meses do período e um `LEFT JOIN` com `users`.

---

# Seção 5

# Seção 6

# Seção 7

# Seção 8

# Uso de Ferramentas de IA
