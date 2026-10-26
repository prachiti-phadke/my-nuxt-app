<script setup>
import { storeToRefs } from 'pinia'
import { useUsersStore } from '~/stores/users'

const store = useUsersStore()
const { total } = storeToRefs(store)

onMounted(() => {
  if (store.users.length === 0) store.fetchUsers()   // load only if nobody has yet
})
</script>

<template>
  <span>Members: {{ total }}</span>
</template>