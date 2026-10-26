export async function useUsers() {
  const { data: users, refresh } = await useFetch('/api/users')

  async function addUser(data) {
    await $fetch('/api/users', { method: 'POST', body: data })
    await refresh()
  }

  async function updateUser(id, data) {
    await $fetch(`/api/users/${id}`, { method: 'PUT', body: data })
    await refresh()
  }

  async function removeUser(id) {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' })
    await refresh()
  }

  return { users, addUser, updateUser, removeUser }
}