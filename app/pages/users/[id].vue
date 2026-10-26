<script setup>
const route = useRoute()

const { data: user, pending, error } = await useFetch(
  `https://jsonplaceholder.typicode.com/users/${route.params.id}`
)

useSeoMeta({
  title: () => user.value?.name ?? 'User',
  description: () => `Details for ${user.value?.name ?? 'this user'}`
})


</script>

<template>
  <NuxtLink to="/users">Back to users</NuxtLink>

  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Could not load this user.</p>
  <div v-else>
    <h1>{{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
    <p>City: {{ user.address.city }}</p>
  </div>
</template>