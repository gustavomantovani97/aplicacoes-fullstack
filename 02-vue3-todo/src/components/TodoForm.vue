<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'add-todo', title: string): void
}>()

// Estado reativo estruturado com reactive() para agrupar dados e validação do formulário
const form = reactive({
  title: '',
  errorMessage: '',
})

// Referência tipada ao elemento input do DOM usando ref()
const inputRef = ref<HTMLInputElement | null>(null)

// Foco automático imediato ao abrir/montar o componente, mantendo o cursor ativo e o placeholder visível
onMounted(() => {
  inputRef.value?.focus()
})

function handleSubmit() {
  const clean = form.title.trim()
  if (!clean) {
    form.errorMessage = 'Por favor, digite o título da tarefa antes de adicionar.'
    inputRef.value?.focus()
    return
  }

  emit('add-todo', clean)
  form.title = ''
  form.errorMessage = ''
  inputRef.value?.focus()
}

function handleInput() {
  if (form.errorMessage) {
    form.errorMessage = ''
  }
}
</script>

<template>
  <form class="todo-form" @submit.prevent="handleSubmit" novalidate>
    <div class="form-group">
      <label for="new-todo-input" class="form-label">
        O que precisa ser feito?
        <span class="required-indicator" aria-hidden="true">*</span>
      </label>

      <div class="input-action-row">
        <input
          id="new-todo-input"
          ref="inputRef"
          v-model="form.title"
          type="text"
          class="todo-input neu-inset"
          placeholder="Ex: Revisar tags de SEO da página"
          autocomplete="off"
          autofocus
          aria-required="true"
          :aria-invalid="!!form.errorMessage"
          aria-describedby="todo-error-msg"
          @input="handleInput"
        />

        <button
          type="submit"
          class="btn-submit neu-button-primary"
          aria-label="Adicionar nova tarefa à lista"
        >
          <span class="btn-text">Adicionar</span>
        </button>
      </div>

      <p
        id="todo-error-msg"
        class="form-error"
        :class="{ 'is-visible': !!form.errorMessage }"
        role="alert"
      >
        <span aria-hidden="true">⚠ </span>
        {{ form.errorMessage }}
      </p>
    </div>
  </form>
</template>

<style scoped>
.todo-form {
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.required-indicator {
  color: var(--color-error);
}

.input-action-row {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

@media (min-width: 520px) {
  .input-action-row {
    flex-direction: row;
  }
}

.todo-input {
  flex: 1;
  padding: 14px 18px;
  font-size: 1rem;
  color: var(--text-primary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  outline: none;
  transition: box-shadow var(--transition-smooth), border-color var(--transition-smooth);
}

.todo-input::placeholder {
  color: var(--text-muted);
  opacity: 0.85;
}

.todo-input:focus {
  border-color: var(--accent);
  box-shadow: var(--shadow-inset-deep), 0 0 0 3px rgba(94, 53, 177, 0.25);
}

.btn-submit {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  cursor: pointer;
  border: none;
  transition: transform var(--transition-press), box-shadow var(--transition-press), background-color var(--transition-smooth);
}

.form-error {
  min-height: 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-error);
  display: none;
  align-items: center;
  gap: 6px;
}

.form-error.is-visible {
  display: flex;
}
</style>
