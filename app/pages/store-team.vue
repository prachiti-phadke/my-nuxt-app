<script setup>
import { storeToRefs } from 'pinia'
import { useUsersStore } from '~/stores/users'

const store = useUsersStore()
const { users, total } = storeToRefs(store)
const { addUser, updateUser, removeUser } = store

await callOnce(() => store.fetchUsers())

const form = ref({ name: '', email: '', role: '' })
const editingId = ref(null)          // null = adding, a number = editing that user

function startEdit(user) {
  editingId.value = user.id
  form.value = { name: user.name, email: user.email, role: user.role }
}

function resetForm() {
  editingId.value = null
  form.value = { name: '', email: '', role: '' }
}

async function handleSave() {
  if (editingId.value === null) {
    await addUser(form.value)
  } else {
    await updateUser(editingId.value, form.value)
  }
  resetForm()
}
</script>

<template>
  <h1>Team (store version)</h1>
  <p>Total members: {{ total }}</p>

  <form @submit.prevent="handleSave">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" placeholder="Email" />
    <input v-model="form.role" placeholder="Role" />
    <button type="submit">{{ editingId === null ? 'Add' : 'Update' }}</button>
    <button v-if="editingId !== null" type="button" @click="resetForm">Cancel</button>
  </form>

  <ul>
    <li v-for="u in users" :key="u.id">
      {{ u.name }} - {{ u.role }}
      <button @click="startEdit(u)">Edit</button>
      <button @click="removeUser(u.id)">Delete</button>
    </li>
  </ul>
</template>