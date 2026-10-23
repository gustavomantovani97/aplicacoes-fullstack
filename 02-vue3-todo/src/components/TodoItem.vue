<script setup lang="ts">
import type { TodoItem as ITodoItem } from '../types/todo'

interface Props {
  todo: ITodoItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()

function handleToggle() {
  emit('toggle', props.todo.id)
}

function handleRemove() {
  emit('remove', props.todo.id)
}
</script>

<template>
  <li class="todo-item neu-raised-sm" :class="{ 'is-completed': todo.completed }">
    <!-- Botão de Alternância de Conclusão (Checkbox Acessível) -->
    <button
      type="button"
      class="toggle-btn"
      :class="todo.completed ? 'toggle-checked neu-inset' : 'toggle-unchecked neu-raised-sm'"
      role="checkbox"
      :aria-checked="todo.completed"
      :aria-label="todo.completed ? `Marcar tarefa '${todo.title}' como pendente` : `Marcar tarefa '${todo.title}' como concluída`"
      @click="handleToggle"
    >
      <span
        class="check-icon"
        :class="todo.completed ? 'check-icon-active' : 'check-icon-ghost'"
        aria-hidden="true"
      >✓</span>
    </button>

    <!-- Título da Tarefa -->
    <span class="todo-title" :class="{ 'text-completed': todo.completed }">
      {{ todo.title }}
    </span>

    <!-- Botão de Remoção -->
    <button
      type="button"
      class="btn-delete neu-button"
      :aria-label="`Excluir tarefa '${todo.title}'`"
      @click="handleRemove"
    >
      <span class="delete-icon" aria-hidden="true">✕</span>
      <span class="sr-only">Excluir</span>
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  transition: transform var(--transition-smooth), opacity var(--transition-smooth);
}

.todo-item:hover {
  transform: translateY(-1px);
}

/* Botão Toggle / Checkbox Neumórfico com Borda Contrastante */
.toggle-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--transition-press), box-shadow var(--transition-press), border-color var(--transition-smooth), background-color var(--transition-smooth);
}

.toggle-unchecked {
  background-color: var(--surface);
  border: 2px solid #5e35b175;
  box-shadow: -2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark);
}

.toggle-unchecked:hover {
  transform: scale(1.08);
  border-color: var(--accent-hover);
  box-shadow: -3px -3px 8px var(--shadow-light), 3px 3px 8px var(--shadow-dark), 0 0 8px rgba(94, 53, 177, 0.4);
}

.toggle-unchecked:active {
  transform: scale(0.96);
  box-shadow: var(--shadow-inset);
}

.toggle-checked {
  background-color: var(--color-success);
  border: 2px solid var(--color-success);
  color: var(--text-white);
  box-shadow: inset -1px -1px 3px rgba(255, 255, 255, 0.3), inset 1px 1px 3px rgba(0, 0, 0, 0.45);
}

.toggle-checked:hover {
  transform: scale(1.05);
  background-color: #14532d;
  border-color: #14532d;
}

.check-icon {
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 1;
  transition: opacity var(--transition-smooth), color var(--transition-smooth), transform var(--transition-press);
}

.check-icon-active {
  color: var(--text-white);
  opacity: 1;
}

/* Marca de sugestão em cinza visível quando desmarcado */
.check-icon-ghost {
  color: #718096;
  opacity: 0.55;
}

.toggle-unchecked:hover .check-icon-ghost {
  color: var(--accent);
  opacity: 0.90;
  transform: scale(1.1);
}

/* Texto do Título */
.todo-title {
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-word;
  transition: color var(--transition-smooth);
}

.todo-title.text-completed {
  text-decoration: line-through;
  color: var(--text-muted);
}

/* Botão de Excluir com Borda Contrastante */
.btn-delete {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface);
  color: var(--color-error);
  border: 2px solid rgba(220, 38, 38, 0.45);
  box-shadow: -2px -2px 6px var(--shadow-light), 2px 2px 6px var(--shadow-dark);
  font-weight: 800;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform var(--transition-press), box-shadow var(--transition-press), border-color var(--transition-smooth), background-color var(--transition-smooth);
}

.btn-delete:hover {
  background-color: rgba(220, 38, 38, 0.12);
  border-color: var(--color-error-border);
  color: #7f1d1d;
  transform: scale(1.08);
  box-shadow: -3px -3px 8px var(--shadow-light), 3px 3px 8px var(--shadow-dark), 0 0 6px rgba(220, 38, 38, 0.3);
}

.btn-delete:active {
  transform: scale(0.96);
  box-shadow: var(--shadow-inset);
}

.delete-icon {
  font-size: 1rem;
  font-weight: 900;
  line-height: 1;
}
</style>
