/**
 * Tipos e Interfaces do Módulo de Tarefas (To-Do)
 * Etapa 02 - Vue 3 (Composition API)
 */

export interface TodoItem {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type TodoFilter = 'all' | 'pending' | 'completed'
