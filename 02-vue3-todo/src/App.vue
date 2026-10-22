<script setup lang="ts">
import { useTodoList } from './composables/useTodoList'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilters from './components/TodoFilters.vue'

const {
  filter,
  currentPage,
  itemsPerPage,
  totalPages,
  paginatedTodos,
  liveAnnouncement,
  filteredTodos,
  stats,
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  setPage,
  nextPage,
  prevPage,
  clearCompleted,
} = useTodoList()
</script>

<template>
  <div class="page-wrapper">
    <!-- Header Semântico e Marca da Aplicação -->
    <header class="page-header">
      <div class="brand-badge neu-raised" aria-label="Logo da Aplicação de Tarefas">
        <span class="brand-dot" aria-hidden="true"></span>
        <span class="brand-name">VUE 3 • COMPOSITION API</span>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="main-content">
      <section class="card neu-raised" aria-labelledby="todo-heading">
        <div class="card-header">
          <h1 id="todo-heading" class="card-title">Gerenciador de Tarefas</h1>
          <p class="card-description">
            Organize suas tarefas com rapidez e produtividade em uma interface moderna e acessível.
          </p>
        </div>

        <!-- Anúncio acessível para leitores de tela (WCAG AA) -->
        <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {{ liveAnnouncement }}
        </div>

        <!-- Formulário para Inclusão de Nova Tarefa -->
        <TodoForm @add-todo="addTodo" />

        <!-- Barra de Filtros e Contadores -->
        <TodoFilters
          :current-filter="filter"
          :stats="stats"
          @change-filter="setFilter"
          @clear-completed="clearCompleted"
        />

        <!-- Lista de Tarefas (Paginadas) -->
        <ul
          v-if="paginatedTodos.length > 0"
          class="todo-list"
          role="list"
          aria-label="Tarefas cadastradas"
        >
          <TodoItem
            v-for="todo in paginatedTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="toggleTodo"
            @remove="removeTodo"
          />
        </ul>

        <!-- Controles de Paginação (exibido apenas se passar de 5 tarefas) -->
        <nav
          v-if="filteredTodos.length > itemsPerPage"
          class="pagination-nav neu-inset"
          aria-label="Paginação da lista de tarefas"
        >
          <button
            type="button"
            class="btn-page neu-button"
            :disabled="currentPage === 1"
            aria-label="Ir para a página anterior"
            @click="prevPage"
          >
            ← Anterior
          </button>

          <div class="page-numbers" role="group" aria-label="Seleção de página">
            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="btn-page-number"
              :class="page === currentPage ? 'page-active neu-button-primary' : 'neu-button'"
              :aria-current="page === currentPage ? 'page' : undefined"
              :aria-label="`Página ${page}`"
              @click="setPage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            type="button"
            class="btn-page neu-button"
            :disabled="currentPage === totalPages"
            aria-label="Ir para a próxima página"
            @click="nextPage"
          >
            Próxima →
          </button>
        </nav>

        <!-- Estado Vazio (Empty State) -->
        <div v-else class="empty-state neu-inset" role="status">
          <p class="empty-title">Nenhuma tarefa encontrada</p>
          <p class="empty-desc">
            {{
              filter === 'completed'
                ? 'Você ainda não concluiu nenhuma tarefa.'
                : filter === 'pending'
                  ? 'Parabéns! Todas as tarefas foram concluídas.'
                  : 'Sua lista está vazia. Adicione uma tarefa acima para começar!'
            }}
          </p>
        </div>
      </section>
    </main>

    <!-- Rodapé Semântico -->
    <footer class="page-footer">
      <p>&copy; 2026 Plataforma SEO. Desenvolvido com Vue 3, Composition API e Neumorphism.</p>
    </footer>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0 20px;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 22px;
  border-radius: var(--radius-pill);
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.brand-name {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-top: 8px;
}

.card {
  width: 100%;
  max-width: 600px;
  padding: 28px 20px;
  border-radius: var(--radius-md);
  background-color: var(--surface);
  /* Borda roxa sutil e refinada com 0.5px de espessura */
  border: 0.5px solid #a78bfa8a;
  /* Sombra neumórfica com luz e reflexos em roxo leve harmonizado com o tema */
  box-shadow: -8px -8px 22px rgba(244, 239, 255, 0.95), 8px 8px 24px rgba(115, 90, 160, 0.35);
}

@media (min-width: 640px) {
  .page-wrapper {
    padding: 32px 20px;
  }
  .card {
    padding: 40px 36px;
    border-radius: var(--radius-lg);
  }
}

.card-header {
  margin-bottom: 24px;
  text-align: center;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 32px 20px;
  border-radius: var(--radius-md);
  margin-top: 12px;
}

.empty-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Barra de Paginação Neumórfica */
.pagination-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  margin-top: 18px;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-page {
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  transition: transform var(--transition-press), box-shadow var(--transition-press);
}

.btn-page:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.page-numbers {
  display: flex;
  gap: 6px;
  align-items: center;
}

.btn-page-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: transform var(--transition-press), box-shadow var(--transition-press);
}

.page-active {
  color: var(--text-white);
  box-shadow: -2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark);
}

.page-footer {
  text-align: center;
  padding: 24px 8px 12px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
