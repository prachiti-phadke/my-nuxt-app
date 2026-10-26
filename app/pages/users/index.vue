<script setup>
const { data: users, pending, error } = await useFetch(
  'https://jsonplaceholder.typicode.com/users'
)
</script>

<template>
  <h1>Users</h1>

  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Could not load users.</p>
  <ul v-else>
    <li v-for="u in users" :key="u.id">
      {{ u.name }} ({{ u.email }})
    </li>
  </ul>
</template>