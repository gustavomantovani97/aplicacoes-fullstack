import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('Integração do App To-Do (Vue 3)', () => {
  beforeEach(() => {
    window.localStorage?.clear()
  })

  it('renderiza o título principal, os componentes base e a barra de paginação', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toBe('Gerenciador de Tarefas')
    expect(wrapper.find('input#new-todo-input').exists()).toBe(true)
    // A página 1 renderiza até 5 itens (limite de itens por página)
    expect(wrapper.findAll('li.todo-item').length).toBe(5)
    expect(wrapper.find('nav.pagination-nav').exists()).toBe(true)
  })

  it('permite adicionar uma tarefa através da interface', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input#new-todo-input')
    const form = wrapper.find('form.todo-form')

    await input.setValue('Comprar café para o time de SEO')
    await form.trigger('submit')

    // Como o novo item é inserido no topo, ele aparece na primeira página
    expect(wrapper.text()).toContain('Comprar café para o time de SEO')
  })

  it('exibe mensagem de erro acessível ao tentar submeter tarefa vazia', async () => {
    const wrapper = mount(App)
    const form = wrapper.find('form.todo-form')

    await form.trigger('submit')

    const errorMsg = wrapper.find('#todo-error-msg')
    expect(errorMsg.text()).toContain('Por favor, digite o título da tarefa')
  })

  it('permite marcar e desmarcar uma tarefa como concluída no clique do botão', async () => {
    const wrapper = mount(App)
    const firstToggleBtn = wrapper.find('button.toggle-btn')

    const initialChecked = firstToggleBtn.attributes('aria-checked') === 'true'
    await firstToggleBtn.trigger('click')

    expect(firstToggleBtn.attributes('aria-checked')).toBe(String(!initialChecked))
  })

  it('permite remover uma tarefa ao clicar no botão de exclusão', async () => {
    const wrapper = mount(App)
    const firstTaskTitle = wrapper.find('span.todo-title').text()
    const firstDeleteBtn = wrapper.find('button.btn-delete')

    await firstDeleteBtn.trigger('click')

    const visibleTitles = wrapper.findAll('span.todo-title').map((el) => el.text())
    expect(visibleTitles).not.toContain(firstTaskTitle)
  })
})
