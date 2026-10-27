import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])                                          // STATE: the list
  const loaded = ref(false)                                      // has the saved list been read yet?

  const remaining = computed(                                    // GETTER
    () => todos.value.filter((t) => !t.done).length
  )

  function addTodo(text) {
    todos.value.push({ id: Date.now(), text, done: false })
  }

  function removeTodo(id) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function updateTodo(id, text) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.text = text
  }

  function loadTodos() {                                         // browser only
    try {
      const saved = localStorage.getItem('todos')
      if (saved) todos.value = JSON.parse(saved)
    } catch {
      todos.value = []                                           // damaged data: start fresh
    }
    loaded.value = true
  }

  // save every change, but only after the saved list has been read
  watch(todos, () => {
    if (!loaded.value) return
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }, { deep: true })

  return { todos, remaining, addTodo, removeTodo, toggleTodo, updateTodo, loadTodos }
})