import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todoText) {
      this.todos.push({ id: Date.now(), text: todoText, completed: false })
    },
    removeTodo(id) {
      console.log(`Before removing todo with id: ${id}`, this.todos)
      this.todos = this.todos.filter(todo => todo.id !== id)
      console.log(`After removing todo with id: ${id}`, this.todos)
    },
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  },
  getters: {
    unfinishedCount: (state) => {
      return state.todos.filter(todo => !todo.completed).length
    }
  }
})
