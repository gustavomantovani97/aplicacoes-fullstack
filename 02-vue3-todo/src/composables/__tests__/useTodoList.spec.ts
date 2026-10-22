import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoList } from '../useTodoList'

describe('useTodoList Composable', () => {
  beforeEach(() => {
    window.localStorage?.clear()
  })

  it('inicializa com tarefas padrão quando o localStorage está vazio', () => {
    const { todos, filteredTodos, stats } = useTodoList()
    expect(todos.value.length).toBeGreaterThan(0)
    expect(filteredTodos.value.length).toBe(todos.value.length)
    expect(stats.value.total).toBe(todos.value.length)
  })

  it('permite adicionar uma nova tarefa com sucesso', () => {
    const { todos, addTodo, liveAnnouncement } = useTodoList()
    const initialCount = todos.value.length

    const added = addTodo('Nova tarefa de teste')
    expect(added).toBe(true)
    expect(todos.value.length).toBe(initialCount + 1)
    expect(todos.value[0]?.title).toBe('Nova tarefa de teste')
    expect(todos.value[0]?.completed).toBe(false)
    expect(liveAnnouncement.value).toContain('adicionada com sucesso')
  })

  it('recusa adicionar tarefa com título vazio ou apenas espaços', () => {
    const { todos, addTodo } = useTodoList()
    const initialCount = todos.value.length

    const addedEmpty = addTodo('   ')
    expect(addedEmpty).toBe(false)
    expect(todos.value.length).toBe(initialCount)
  })

  it('marca uma tarefa como concluída e reabre como pendente', () => {
    const { todos, toggleTodo, liveAnnouncement } = useTodoList()
    const target = todos.value[0]
    expect(target).toBeDefined()
    if (!target) return

    const initialStatus = target.completed

    toggleTodo(target.id)
    expect(target.completed).toBe(!initialStatus)
    expect(liveAnnouncement.value).toContain(target.title)

    // Inverte novamente
    toggleTodo(target.id)
    expect(target.completed).toBe(initialStatus)
  })

  it('remove uma tarefa da lista corretamente', () => {
    const { todos, removeTodo, liveAnnouncement } = useTodoList()
    const initialCount = todos.value.length
    const target = todos.value[0]
    expect(target).toBeDefined()
    if (!target) return

    removeTodo(target.id)
    expect(todos.value.length).toBe(initialCount - 1)
    expect(todos.value.some((t) => t.id === target.id)).toBe(false)
    expect(liveAnnouncement.value).toContain('removida da lista')
  })

  it('filtra tarefas por pendentes e concluídas', () => {
    const { setFilter, filteredTodos } = useTodoList()

    setFilter('pending')
    expect(filteredTodos.value.every((t) => !t.completed)).toBe(true)

    setFilter('completed')
    expect(filteredTodos.value.every((t) => t.completed)).toBe(true)

    setFilter('all')
    expect(filteredTodos.value.length).toBeGreaterThan(0)
  })

  it('remove todas as tarefas concluídas ao chamar clearCompleted', () => {
    const { todos, clearCompleted } = useTodoList()
    clearCompleted()

    expect(todos.value.every((t) => !t.completed)).toBe(true)
  })

  it('pagina tarefas exibindo no máximo 5 itens por página com splice', () => {
    const { todos, addTodo, paginatedTodos, totalPages, currentPage, nextPage, prevPage } = useTodoList()

    // Limpa e adiciona 8 tarefas
    todos.value = []
    for (let i = 1; i <= 8; i++) {
      addTodo(`Tarefa número ${i}`)
    }

    expect(todos.value.length).toBe(8)
    expect(totalPages.value).toBe(2)
    expect(currentPage.value).toBe(1)
    // Página 1 deve conter exatamente 5 itens
    expect(paginatedTodos.value.length).toBe(5)

    // Navega para a página 2
    nextPage()
    expect(currentPage.value).toBe(2)
    // Página 2 deve conter os 3 itens restantes
    expect(paginatedTodos.value.length).toBe(3)

    // Retorna para a página 1
    prevPage()
    expect(currentPage.value).toBe(1)
    expect(paginatedTodos.value.length).toBe(5)
  })
})
