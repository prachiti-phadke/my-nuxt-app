import { defineStore } from 'pinia'
import { api } from '~/utils/api'

export const useApiTodosStore = defineStore('apiTodos', () => {
  const todos = ref([])          // STATE: the data
  const loading = ref(false)     // STATE: is a request running?
  const error = ref(null)        // STATE: what went wrong, if anything

  async function fetchTodos() {  // ACTION
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/todos', { params: { _limit: 5 } })
      todos.value = response.data
    } catch (e) {
      console.error(e)
      error.value = e.message
    } finally {
      loading.value = false      // runs whether it worked or failed
    }
  }

  return { todos, loading, error, fetchTodos }
})