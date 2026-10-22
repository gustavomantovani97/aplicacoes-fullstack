/**
 * Composable de Gerenciamento da Lista de Tarefas (useTodoList)
 * Implementado com Vue 3 Composition API e reatividade granular.
 */

import { ref, reactive, toRefs, computed, watch } from 'vue'
import type { TodoItem, TodoFilter } from '../types/todo'

const STORAGE_KEY = 'vue3_todo_items_v2'

function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage
    }
  } catch {
    // Retorna null caso o storage não esteja acessível
  }
  return null
}

/**
 * Dados padrão pré-carregados (7 tarefas) para demonstrar a paginação ativa (> 5 itens) por padrão.
 */
const DEFAULT_TODOS: TodoItem[] = [
  {
    id: '1',
    title: 'Estudar conceitos de SEO e acessibilidade (WCAG AA)',
    completed: true,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    title: 'Implementar To-Do List em Vue 3 com Composition API',
    completed: true,
    createdAt: Date.now() - 3000000,
  },
  {
    id: '3',
    title: 'Aplicar design Neumorphism com sombras em roxo suave',
    completed: false,
    createdAt: Date.now() - 2400000,
  },
  {
    id: '4',
    title: 'Validar contraste visual dos botões e foco por teclado',
    completed: false,
    createdAt: Date.now() - 1800000,
  },
  {
    id: '5',
    title: 'Implementar paginação de tarefas com o método splice()',
    completed: false,
    createdAt: Date.now() - 1200000,
  },
  {
    id: '6',
    title: 'Executar testes unitários automatizados com Vitest',
    completed: false,
    createdAt: Date.now() - 600000,
  },
  {
    id: '7',
    title: 'Auditar Performance e Melhores Práticas no Lighthouse',
    completed: false,
    createdAt: Date.now(),
  },
]

export function useTodoList() {
  const storage = getStorage()
  const stored = storage ? storage.getItem(STORAGE_KEY) : null
  const initialTodos: TodoItem[] = stored ? JSON.parse(stored) : DEFAULT_TODOS

  const todos = ref<TodoItem[]>(initialTodos)
  const filter = ref<TodoFilter>('all')
  const liveAnnouncement = ref<string>('')

  // Configuração e estado de Paginação agrupados através da primitiva reactive()
  const pagination = reactive({
    currentPage: 1,
    itemsPerPage: 5,
  })

  // Sincronização automática com localStorage
  watch(
    todos,
    (updatedTodos) => {
      const s = getStorage()
      if (s) {
        s.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      }
    },
    { deep: true },
  )

  /**
   * Lista de tarefas filtrada com base no filtro selecionado ('all' | 'pending' | 'completed').
   */
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'pending':
        return todos.value.filter((todo) => !todo.completed)
      case 'completed':
        return todos.value.filter((todo) => todo.completed)
      case 'all':
      default:
        return todos.value
    }
  })

  /**
   * Quantidade total de páginas disponíveis.
   */
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredTodos.value.length / pagination.itemsPerPage))
  })

  /**
   * Tarefas exibidas na página atual obtidas através do método nativo splice().
   * Clona a lista para garantir que a lista reativa original não seja mutada.
   */
  const paginatedTodos = computed(() => {
    const listCopy = [...filteredTodos.value]
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    return listCopy.splice(startIndex, pagination.itemsPerPage)
  })

  // Ajusta a página atual se a lista for reduzida após exclusão ou filtro
  watch([filteredTodos, totalPages], () => {
    if (pagination.currentPage > totalPages.value) {
      pagination.currentPage = totalPages.value
    }
  })

  // Reseta para a primeira página ao alternar o filtro
  watch(filter, () => {
    pagination.currentPage = 1
  })

  /**
   * Navega para uma página específica.
   */
  function setPage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      pagination.currentPage = page
    }
  }

  /**
   * Avança para a próxima página.
   */
  function nextPage(): void {
    if (pagination.currentPage < totalPages.value) {
      pagination.currentPage++
    }
  }

  /**
   * Retorna para a página anterior.
   */
  function prevPage(): void {
    if (pagination.currentPage > 1) {
      pagination.currentPage--
    }
  }

  /**
   * Estatísticas da lista para indicadores numéricos e acessibilidade.
   */
  const stats = computed(() => {
    const total = todos.value.length
    const completed = todos.value.filter((t) => t.completed).length
    const pending = total - completed
    return { total, completed, pending }
  })

  /**
   * Adiciona uma nova tarefa à lista.
   * Valida se o título não está em branco.
   * 
   * @param rawTitle Título da tarefa digitado pelo usuário
   * @returns true se adicionada com sucesso, false caso contrário
   */
  function addTodo(rawTitle: string): boolean {
    const cleanTitle = rawTitle.trim()
    if (!cleanTitle) {
      return false
    }

    const newTodo: TodoItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: cleanTitle,
      completed: false,
      createdAt: Date.now(),
    }

    // Insere no início da lista para visualização imediata
    todos.value.unshift(newTodo)
    liveAnnouncement.value = `Tarefa "${cleanTitle}" adicionada com sucesso.`
    return true
  }

  /**
   * Alterna o estado de conclusão de uma tarefa (concluída <-> pendente).
   * 
   * @param id Identificador da tarefa
   */
  function toggleTodo(id: string): void {
    const target = todos.value.find((t) => t.id === id)
    if (target) {
      target.completed = !target.completed
      liveAnnouncement.value = target.completed
        ? `Tarefa "${target.title}" marcada como concluída.`
        : `Tarefa "${target.title}" reaberta como pendente.`
    }
  }

  /**
   * Remove uma tarefa da lista.
   * 
   * @param id Identificador da tarefa a ser excluída
   */
  function removeTodo(id: string): void {
    const index = todos.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      const removed = todos.value.splice(index, 1)[0]
      if (removed) {
        liveAnnouncement.value = `Tarefa "${removed.title}" removida da lista.`
      }
    }
  }

  /**
   * Define o filtro de visualização.
   * 
   * @param newFilter Novo filtro a ser aplicado
   */
  function setFilter(newFilter: TodoFilter): void {
    filter.value = newFilter
  }

  /**
   * Remove todas as tarefas já marcadas como concluídas.
   */
  function clearCompleted(): void {
    const count = todos.value.filter((t) => t.completed).length
    if (count > 0) {
      todos.value = todos.value.filter((t) => !t.completed)
      liveAnnouncement.value = `${count} tarefas concluídas foram removidas.`
    }
  }

  return {
    todos,
    filter,
    pagination,
    ...toRefs(pagination),
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
  }
}
