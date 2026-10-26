<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'plain' })

const auth = useAuthStore()
const name = ref('')

async function handleLogin() {
  if (!name.value.trim()) return
  auth.login(name.value.trim())
  await navigateTo('/store-team')
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="handleLogin">
    <input v-model="name" placeholder="Your name" />
    <button type="submit">Log in</button>
  </form>
</template>