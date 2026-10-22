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

# Seção 2

# Seção 3

# Seção 4

# Seção 5

# Seção 6

# Seção 7

# Seção 8

# Uso de Ferramentas de IA
