<template>
  <div class="app-container">
    <h1>Todo List from @nurasyifah_</h1>
    <div class="input-container">
      <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="add a new to do" />
      <button @click="addNewTodo">add</button>
    </div>
    <button @click="checkUnfinishedCount">check unfinished tasks</button>
    <p>unfinished tasks: {{ unfinishedCount }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="toggleComplete(todo.id)">✔️</button>
        <button @click="deleteTodo(todo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/countStore'

export default {
  setup() {
    const todoStore = useTodoStore()
    const newTodo = ref('')

    const addNewTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value)
        newTodo.value = ''
      }
    }

    const checkUnfinishedCount = () => {
      alert(`Unfinished tasks: ${todoStore.unfinishedCount}`)
    }

    const deleteTodo = (id) => {
      console.log(`Deleting todo with id: ${id}`)
      todoStore.removeTodo(id)
    }

    const todos = computed(() => todoStore.todos)
    const unfinishedCount = computed(() => todoStore.unfinishedCount)

    return {
      newTodo,
      addNewTodo,
      todos,
      deleteTodo,
      toggleComplete: todoStore.toggleTodo,
      checkUnfinishedCount,
      unfinishedCount
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: skyblue;
  color: #01579b;
}

.app-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-family: Edwardian Script ITC, sans-serif;
  color: skyblue;
}

p {
  color: skyblue;
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 2px solid skyblue;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: skyblue;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: skyblue;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #b3e5fc;
}

.completed {
  text-decoration: line-through;
  color: skyblue;
}

li button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

li button:hover {
  color: #01579b;
}
</style>
