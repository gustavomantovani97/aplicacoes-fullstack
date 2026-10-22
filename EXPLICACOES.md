# Seção 1 - 01-html-css: Página de Cadastro com Neumorfismo e Validação Nativa (HTML + CSS)

## 1. O que foi feito
Desenvolveu-se uma página estática de cadastro completa e responsiva construída **estritamente com HTML5 e CSS3 modernos**, sem necessidade de JavaScript ou de frameworks externos:
- Formulário com os campos **Nome completo**, **E-mail** e **Senha de acesso**, além de botão de submissão estilizado.
- Interface visual elaborada com a estética **Neumorphism (Soft UI)**, aplicando a física de relevo (*raised*) no cartão, reentrância (*inset*) nos inputs e feedback tátil de clique no botão.
- Sistema de validação 100% nativo do HTML5 (`required`, `type="email"`, `minlength="8"`, `autocomplete`), combinado com pseudo-classes modernas do CSS (`:user-invalid`, `:user-valid`) para exibir indicadores de erro visuais e textuais apenas após a interação do usuário.
- Feedback de envio bem-sucedido em **HTML+CSS** utilizando a técnica de fragmento local (`action="#success-message"`) combinada com o seletor CSS `:target`, exibindo o banner de sucesso acessível sem necessidade de servidor ou recarregamento externo.

---

## 2. Decisões Técnicas e Organização

### Estrutura Semântica do HTML e SEO
- **Declaração de Idioma e Metadados**: Documento configurado com viewport para responsividade e metatags essenciais de SEO (`<title>` descritivo, meta description voltada para conversão, tag `robots` e URL canônica).
- **Metatags Open Graph**: Inclusão de `og:title`, `og:description`, `og:type` e `og:site_name` para visualização em redes sociais e buscadores.
- **Landmarks e Hierarquia**: Uso estrito dos elementos semânticos `<header>` (identificação da marca), `<main>` (área central), `<section>` (área de conteúdo com `aria-labelledby`) e `<footer>` (direitos autorais). A página possui um único elemento `<h1>` ("Criar nova conta").

### Acessibilidade (WCAG AA)
- **Vínculo Explícito de Rótulos**: Cada `<label>` possui atributo `for` conectado ao respectivo `id` do `<input>`.
- **Indicação de Erros Não Dependente Apenas de Cor**: Campos com erro recebem `:user-invalid`, borda vermelha contrastante e mensagem textual acompanhada de ícone de alerta visual (`⚠`). O erro é associado ao campo pelo `aria-describedby`.
- **Foco e Navegação por Teclado**: Estilos evidentes de `:focus` e `:focus-visible` em todos os elementos interativos. O navegador foca automaticamente no primeiro campo incorreto ao tentar submeter dados inválidos.
- **Garantia de Contraste no Neumorfismo**: A cor de fundo unificada é `--surface: #e0e5ec`. Para cumprir o critério WCAG AA (mínimo de 4.5:1), a tipografia emprega cinzas profundos (`#111827` com contraste > 11.5:1 e `#2d3748` com > 7.4:1), o vermelho de erro atinge 6.1:1 e o botão principal adota lavanda escuro (`#5e35b1`) com texto branco em 8.5:1.

### Arquitetura do CSS em Camadas e Adaptação Mobile
O arquivo `css/styles.css` foi estruturado de forma modular e manutenível:
1. **Tokens**: Variáveis CSS (`:root`) definindo paleta, sombras duplas (clara no topo-esquerdo e escura na base-direita), raios de borda e transições físicas.
2. **Base**: Reset global, `box-sizing: border-box`, tipografia de sistema e estilização do elemento `body`.
3. **Layout**: Definição da estrutura geral (`.page-wrapper`, `.main-content`) desenhada com breakpoint responsivo em `@media (min-width: 640px)`.
4. **Componentes**: Módulos visuais isolados (o cartão `.card`, campos `.form-input`, botão `.btn-primary` e o alerta `#success-message`).
5. **Estados**: Pseudo-classes de interação (`:hover`, `:active`, `:focus-visible`), validação nativa dinâmica (`:user-invalid`, `:user-valid`), ativação por fragmento (`#success-message:target`) e media query `@media (prefers-reduced-motion: reduce)` para respeitar usuários com sensibilidade a animações.
6. **Responsividade Mobile**: Ajustes pontuais restritos a dispositivos móveis (`@media (max-width: 639px)`), centralizando rótulos (`.form-label`), dicas (`.field-hint`), reorientando o alerta de sucesso para coluna (`flex-direction: column`), alinhando seus textos e ícone ao centro (`text-align: center`), além de texto justificado com hifenização no cabeçalho do card e margens verticais dinâmicas via `vh`.

### Mecanismo de Validação e Envio em HTML + CSS
- **Validação Nativa HTML5**: Sem o atributo `novalidate`, o navegador intercepta a tentativa de submissão se qualquer restrição for violada (`required`, formato de e-mail ou `minlength="8"`), exibindo balões de validação nativos traduzidos para o idioma do usuário e impedindo a navegação.
- **Pseudo-classe `:user-invalid`**: Em vez de marcar os campos em vermelho logo no carregamento inicial da página (o que ocorreria com o seletor `:invalid` puro), o seletor `:user-invalid` atua somente após o usuário interagir com o campo e sair dele mantendo um dado inválido, ativando as bordas de erro e o `span.field-error` correspondente via seletor irmão (`~`).
- **Estado de Sucesso via `:target`**: O formulário possui `action="#success-message" method="GET"`. Ao preencher todos os campos com sucesso e submeter, o navegador atualiza o hash da URL para `#success-message`. A regra CSS `#success-message:target { display: flex; }` exibe o alerta instantaneamente. Um link interno ("Fazer novo cadastro") aponta para `#`, permitindo dispensar a mensagem a qualquer momento.

### Validação de Qualidade e Auditoria (Lighthouse)
Todas as decisões arquiteturais da página foram tomadas intencionalmente para assegurar conformidade com as quatro categorias avaliadas pelo Lighthouse do DevTools:
- **Performance**: A opção por uma construção sem scripts bloqueantes ou bibliotecas externas pesadas, combinada ao uso de CSS leve e fontes nativas do sistema, garante renderização quase instantânea e ausência de deslocamento de layout.
- **Acessibilidade (a11y)**: O vínculo individual e explícito de rótulos (`<label for>`), a demarcação semântica com landmarks, o contraste de cor superior às exigências mínimas do WCAG AA e a navegação consistente por teclado foram estruturados para atender aos padrões de usabilidade e tecnologias assistivas.
- **Melhores Práticas (Best Practices)**: A declaração de documento moderno (`<!DOCTYPE html>`), a codificação de caracteres UTF-8 posicionada no início do `<head>` e a integridade de um código sem APIs obsoletas ou erros no console asseguram estabilidade e longevidade.
- **SEO**: A definição de título descritivo, meta description com foco em conversão, URL canônica, hierarquia com um único `<h1>` e metatags Open Graph foram planejadas para conferir máxima rastejabilidade e clareza aos motores de busca.

A execução do teste de auditoria pelo Lighthouse confirmou resultados plenamente satisfatórios em todas as quatro frentes avaliadas, atestando a eficácia das escolhas técnicas adotadas.

---

# Seção 2 - 02-vue3-todo: Lista de Tarefas (To-Do List) com Vue 3 Composition API

## 1. O que foi feito
Desenvolveu-se uma aplicação completa de gerenciamento de tarefas (*To-Do List*) estruturada com **Vue 3**, **Composition API** (`<script setup lang="ts">`), **TypeScript** e **Vite**, seguindo os padrões do ecossistema moderno:
- **Inclusão de tarefas**: Formulário com validação imediata (impede tarefas em branco com aviso visual e retorno de foco automático).
- **Conclusão de tarefas**: Alternância tátil entre pendente e concluída, com texto riscado (*line-through*) e indicador de checkbox acessível.
- **Remoção de tarefas**: Botão de exclusão com rótulo acessível individual (`aria-label`) para cada item.
- **Filtros e contadores dinâmicos**: Navegação entre "Todas", "Pendentes" e "Concluídas", além da opção de limpar tarefas concluídas em lote.
- **Paginação de tarefas com `splice()`**: Exibição paginada de até 5 tarefas por página quando a lista ultrapassa esse limite, com navegação fluida por botões de página e controles de "Anterior" e "Próxima".
- **Affordance e Contraste dos Botões de Ação**: Botões de alternância (`.toggle-btn`) e exclusão (`.btn-delete`) com bordas contrastantes evidentes (roxa e avermelhada), conferindo clareza imediata de elemento clicável.
- **Persistência local**: Sincronização automática com `localStorage`, preservando as tarefas entre recarregamentos da página.
- **Design Neumórfico (Soft UI)**: Identidade visual consistente com sombras duplas, alta legibilidade e foco acessível.
- **Testes Unitários com Vitest**: Suíte de 13 testes cobrindo regras de negócio do composable (incluindo paginação) e integração com o DOM via `@vue/test-utils`.

---

## 2. Decisões Técnicas e Arquitetura

### Organização dos Componentes
A arquitetura da interface foi estruturada seguindo o **Princípio de Responsabilidade Única (Single Responsibility Principle - SRP)** e o padrão de fluxo de dados unidirecional (*Props Down, Events Up*), dividida em:
- **`App.vue` (Componente Raiz / Orquestrador)**:
  - Centraliza o layout global com tags semânticas (`<header>`, `<main>`, `<section>`, `<footer>`).
  - Consome o composable `useTodoList`, servindo de ponte entre as regras de negócio e os componentes visuais.
  - Renderiza os controles de paginação, gerencia o estado vazio (*empty state*) e provê o contêiner com bordas e sombras neumórficas refinadas.
- **`TodoForm.vue` (Formulário de Entrada)**:
  - Focado exclusivamente na captura, validação síncrona imediata (impedindo envios vazios e reposicionando o foco via acessibilidade) e submissão de novas tarefas.
  - Emite o evento tipado `@add-todo` para o componente pai.
- **`TodoItem.vue` (Item Unitário da Lista)**:
  - Apresenta individualmente cada tarefa com checkbox acessível (`role="checkbox"`, `aria-checked`), título com efeito riscado (*line-through*) e botão de exclusão com rótulo semântico (`aria-label`).
  - Emite os eventos tipados `@toggle` e `@remove`.
- **`TodoFilters.vue` (Barra de Filtros e Estatísticas)**:
  - Apresenta as opções de filtro ("Todas", "Pendentes", "Concluídas") com badges numéricos em tempo real e o botão de limpeza em lote de concluídas.
  - Emite `@change-filter` e `@clear-completed`.
- **`src/composables/useTodoList.ts` (Camada de Domínio / Regras de Negócio)**:
  - Isola 100% da lógica reativa, persistência em `localStorage`, algoritmos de filtragem, paginação por `splice()` e anúncios sonoros para leitores de tela (`aria-live`), garantindo total independência em relação à árvore de componentes.

### Primitivas da Composition API Utilizadas e Justificativas Técnicas

1. **`ref()`**:
   - **Onde foi utilizado**:
     - No composable: `todos = ref<TodoItem[]>(initialTodos)` (lista principal de tarefas), `filter = ref<TodoFilter>('all')` e `liveAnnouncement = ref<string>('')` (mensagens de acessibilidade).
     - No componente `TodoForm.vue`: `inputRef = ref<HTMLInputElement | null>(null)` (referência tipada ao elemento `<input>` no DOM).
   - **Por que foi utilizado**:
     - O `ref()` é a primitiva canônica do Vue 3 para armazenar valores primitivos (`string`, `number`, `boolean`), arrays inteiros que sofrem reatribuição e referências a nós nativos do DOM (*template refs*). Seu encapsulamento em um objeto reativo com a propriedade `.value` permite que o Vue rastreie dependências de leitura e escrita com total segurança de tipos no TypeScript.

2. **`reactive()`**:
   - **Onde foi utilizado**:
     - No componente `TodoForm.vue`: `form = reactive({ title: '', errorMessage: '' })` (agrupamento do modelo de dados e do estado de validação).
     - No composable `useTodoList.ts`: `pagination = reactive({ currentPage: 1, itemsPerPage: 5 })` (agrupamento do estado coeso de paginação).
   - **Por que foi utilizado**:
     - O `reactive()` cria um proxy reativo sobre um objeto JavaScript complexo. É a primitiva ideal para **agrupar estados fortemente correlacionados** em uma única estrutura lógica, dispensando a repetição contínua de `.value` dentro da lógica de script do componente e mantendo a mutação de propriedades coesa e semântica.

3. **`toRefs()`**:
   - **Onde foi utilizado**:
     - No retorno do composable `useTodoList.ts`: `...toRefs(pagination)`.
   - **Por que foi utilizado**:
     - A desestruturação direta de um objeto retornado por `reactive()` rompe a reatividade de suas propriedades. O `toRefs()` converte cada chave de `pagination` em um `Ref` individual apontando para a fonte original. Dessa forma, quem consome o composable (`App.vue` ou os testes unitários) pode desestruturar `{ currentPage, itemsPerPage }` com total preservação da reatividade bidirecional.

4. **`computed()`**:
   - **Onde foi utilizado**:
     - `filteredTodos`: lista derivada de acordo com o status selecionado.
     - `totalPages`: cálculo do teto de páginas disponíveis (`Math.ceil(...)`).
     - `paginatedTodos`: extração segura das tarefas da página corrente utilizando o método `splice()` sobre uma cópia da lista.
     - `stats`: agregações numéricas instantâneas (`total`, `completed`, `pending`).
   - **Por que foi utilizado**:
     - Propriedades computadas possuem **memoização (cache inteligente)**: só são reavaliadas quando uma de suas dependências reativas sofre alteração real. Isso previne execuções e filtragens repetitivas a cada ciclo de renderização, garantindo alta performance e centralizando a regra como fonte única da verdade (*single source of truth*).

5. **`watch()`**:
   - **Onde foi utilizado**:
     - `watch(todos, ..., { deep: true })`: sincroniza qualquer mutação da lista de tarefas diretamente com a API do `localStorage`.
     - `watch([filteredTodos, totalPages], ...)`: autocorreção defensiva da página atual caso a exclusão de itens ou troca de filtros reduza a quantidade de páginas.
     - `watch(filter, ...)`: reseta automaticamente a navegação para a página 1 ao alternar entre abas.
   - **Por que foi utilizado**:
     - Diferente de `computed()` (que deve ser uma função pura sem efeitos colaterais), o `watch()` é a primitiva desenhada pelo Vue especificamente para executar **efeitos colaterais (side effects)** imperativos ou de persistência em resposta a alterações de estado.

6. **`defineProps()` e `defineEmits()`**:
   - **Onde foi utilizado**: Em todos os componentes filhos (`TodoForm.vue`, `TodoItem.vue`, `TodoFilters.vue`).
   - **Por que foi utilizado**: Macros de compilação da Composition API essenciais para declarar formalmente o contrato de dados de entrada (*Props*) e saída (*Emits*) com tipagem estrita no TypeScript, sem overhead em tempo de execução.

7. **`onMounted()`**:
   - **Onde foi utilizado**: No componente `TodoForm.vue`.
   - **Por que foi utilizado**: Hook de ciclo de vida executado após a montagem do componente no DOM. Foi utilizado para acionar o foco programático imediato (`inputRef.value?.focus()`), garantindo que o cursor de texto (linha piscante/caret) fique ativo por padrão ao carregar a página, mantendo o placeholder descritivo visível e permitindo digitação instantânea sem necessidade de clique prévio.

### Separação de Regras de Negócio e Paginação com `splice()`
Para manter a arquitetura limpa e de fácil manutenção, toda a lógica de estado foi isolada em `src/composables/useTodoList.ts`:
- **Paginação com `splice()`**: Quando a lista ultrapassa o limite de 5 itens, o recorte da página é realizado clonando a lista filtrada (`[...filteredTodos.value]`) e aplicando `splice(startIndex, pagination.itemsPerPage)`. Essa abordagem atende estritamente à utilização do método `splice()` sem provocar mutações acidentais na fonte de dados reativa original.
- **Testabilidade Desacoplada**: A lógica de negócio pode ser testada exaustivamente em testes unitários puros, independentemente de montagem ou ciclo de vida de componentes gráficos.

### Acessibilidade (WCAG AA), Affordance e SEO Técnico
- **Affordance e Contraste Reforçado dos Botões**: Os botões `.toggle-btn` e `.btn-delete` receberam bordas sólidas de 2px com cores semânticas de alto contraste (roxa `--accent: #5e35b1` para o botão de marcação e avermelhada `rgba(220, 38, 38, 0.45)` para o botão de exclusão). Essa distinção elimina a sensação de elemento apagado típica do neumorfismo puro e deixa inequívoca a funcionalidade de clique.
- **Anúncios em Tempo Real**: Inclusão de elemento `<div role="status" aria-live="polite">` que anuncia automaticamente adições, conclusões e exclusões de tarefas para usuários de leitores de tela.
- **Rótulos e Nomes Acessíveis**: Todos os botões possuem textos perceptíveis ou `aria-label` explícito identificando a tarefa sobre a qual atuam.
- **Contraste de Cores**: Textos principais (`#111827`) e secundários (`#2d3748`) com contraste superior a 7:1 sobre a superfície neumórfica `#e0e5ec` (acima do mínimo de 4.5:1 exigido pelo critério WCAG AA).
- **SEO no `index.html`**: Configuração com `<html lang="pt-BR">`, `<title>` descritivo, meta description voltada para a aplicação, URL canônica, cor de tema e metatags Open Graph.

### Validação de Qualidade e Testes (Vitest)
A aplicação possui 100% de aprovação na suíte de testes unitários:
- 8 testes dedicados ao composable (`useTodoList.spec.ts`), validando adições, recusa de títulos em branco, alternância de status, exclusão, filtros e a paginação com `splice()`.
- 5 testes de integração de componentes (`TodoApp.spec.ts`), simulando interações reais do usuário no DOM.
- Verificação de tipos estrita (`vue-tsc --build`) e linter (Oxlint e ESLint) executados com zero erros.

---

# Seção 3

# Seção 4

# Seção 5

# Seção 6

# Seção 7

# Seção 8

# Uso de Ferramentas de IA
