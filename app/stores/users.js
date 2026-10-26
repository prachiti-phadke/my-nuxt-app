import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])                              // STATE: the list
  const total = computed(() => users.value.length)   // GETTER: how many members

  async function fetchUsers() {                      // ACTION: load from the server
    users.value = await $fetch('/api/users')
  }

  async function addUser(data) {
  await $fetch('/api/users', { method: 'POST', body: data })
  await fetchUsers()        // reload the list so the store matches the server
}

async function removeUser(id) {
  await $fetch(`/api/users/${id}`, { method: 'DELETE' })
  await fetchUsers()
}

async function updateUser(id, data) {
  await $fetch(`/api/users/${id}`, { method: 'PUT', body: data })
  await fetchUsers()
}

  return { users, total, fetchUsers , addUser, removeUser, updateUser}
})