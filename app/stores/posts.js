// app/stores/posts.js : owns the data and every action that changes it
import { defineStore } from 'pinia'
import { api } from '~/utils/api'

export const usePostsStore = defineStore('posts', () => {
  // ---------- STATE: the data the page shows ----------
  const posts = ref([])        // the list of posts
  const loading = ref(false)   // true while a request is running (shows a spinner)
  const error = ref(null)      // the last error message, or null

  // ---------- GETTER: a value calculated from the state ----------
  const total = computed(() => posts.value.length)

  // ---------- HELPERS ----------
  // JSONPlaceholder only holds posts 1 to 100, and it pretends to save changes.
  // A post we "create" gets a big local id (Date.now()), and the server has never
  // heard of it, so for those we change the list here without calling the server.
  const isLocal = (id) => id > 100

  // Prefer the server's message if there is one, otherwise axios's own message
  const errorMessage = (e) => e.response?.data?.message || e.message

  // ---------- READ: GET /posts ----------
  async function fetchPosts() {
    loading.value = true
    error.value = null
    try {
      // params adds ?_limit=10 to the address: only 10 posts, not all 100
      const response = await api.get('/posts', { params: { _limit: 10 } })
      posts.value = response.data
    } catch (e) {
      error.value = errorMessage(e)
    } finally {
      loading.value = false   // runs whether the request worked or failed
    }
  }

  // ---------- CREATE: POST /posts ----------
  async function addPost(data) {
    try {
      // The body we send. userId 1 is a fixed value because this API needs one.
      const response = await api.post('/posts', { ...data, userId: 1 })
      // The fake server always answers with id 101 (and saves nothing), so we give
      // the post our own unique id. unshift puts it at the top of the list.
      posts.value.unshift({ ...response.data, id: Date.now() })
      return true
    } catch (e) {
      error.value = errorMessage(e)
      return false
    }
  }

  // ---------- UPDATE: PUT /posts/:id ----------
  async function updatePost(id, data) {
    try {
      if (!isLocal(id)) {
        await api.put(`/posts/${id}`, { id, userId: 1, ...data })
      }
      // map goes through the list and replaces only the post with this id
      posts.value = posts.value.map((p) => (p.id === id ? { ...p, ...data } : p))
      return true
    } catch (e) {
      error.value = errorMessage(e)
      return false
    }
  }

  // ---------- DELETE: DELETE /posts/:id ----------
  async function removePost(id) {
    try {
      if (!isLocal(id)) {
        await api.delete(`/posts/${id}`)
      }
      // filter keeps every post except the one with this id
      posts.value = posts.value.filter((p) => p.id !== id)
      return true
    } catch (e) {
      error.value = errorMessage(e)
      return false
    }
  }

  // Hand out everything the page may use
  return { posts, loading, error, total, fetchPosts, addPost, updatePost, removePost }
})