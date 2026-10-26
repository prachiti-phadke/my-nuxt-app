<script setup>
const { users, addUser, updateUser, removeUser } = await useUsers()

const editingUser = ref(null)      // null = adding, an object = editing

async function handleSave(data) {
  if (editingUser.value) {
    await updateUser(editingUser.value.id, data)
  } else {
    await addUser(data)
  }
  editingUser.value = null
}
</script>

<template>
  <h1>Team</h1>

  <UserForm
    :user="editingUser"
    @save="handleSave"
    @cancel="editingUser = null"
  />

  <UserTable
    :users="users"
    @edit="editingUser = $event"
    @remove="removeUser"
  />
</template>