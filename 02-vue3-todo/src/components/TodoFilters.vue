<script setup lang="ts">
import type { TodoFilter } from '../types/todo'

interface Props {
  currentFilter: TodoFilter
  stats: {
    total: number
    completed: number
    pending: number
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change-filter', filter: TodoFilter): void
  (e: 'clear-completed'): void
}>()

const filterOptions: Array<{ key: TodoFilter; label: string }> = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
]

function getCount(key: TodoFilter): number {
  if (key === 'pending') return props.stats.pending
  if (key === 'completed') return props.stats.completed
  return props.stats.total
}
</script>

<template>
  <nav class="filters-container" aria-label="Filtros de tarefas">
    <div class="filters-group" role="group" aria-label="Filtrar por status">
      <button
        v-for="opt in filterOptions"
        :key="opt.key"
        type="button"
        class="filter-btn"
        :class="currentFilter === opt.key ? 'filter-active neu-inset' : 'neu-button'"
        :aria-pressed="currentFilter === opt.key"
        @click="emit('change-filter', opt.key)"
      >
        <span>{{ opt.label }}</span>
        <span class="badge" aria-hidden="true">{{ getCount(opt.key) }}</span>
        <span class="sr-only">({{ getCount(opt.key) }} tarefas)</span>
      </button>
    </div>

    <button
      v-if="stats.completed > 0"
      type="button"
      class="btn-clear neu-button"
      @click="emit('clear-completed')"
    >
      Limpar concluídas
    </button>
  </nav>
</template>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  align-items: stretch;
}

@media (min-width: 540px) {
  .filters-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.filters-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  transition: transform var(--transition-press), box-shadow var(--transition-press);
}

.filter-active {
  color: var(--accent);
}

.badge {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: var(--radius-pill);
  background-color: var(--surface-deep);
  color: var(--text-primary);
}

.filter-active .badge {
  background-color: var(--accent);
  color: var(--text-white);
}

.btn-clear {
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-error);
  border-radius: var(--radius-pill);
  align-self: flex-start;
}

@media (min-width: 540px) {
  .btn-clear {
    align-self: auto;
  }
}
</style>
