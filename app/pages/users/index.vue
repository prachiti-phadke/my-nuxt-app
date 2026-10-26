<script setup>
const { data: users, pending, error } = await useFetch(
  'https://jsonplaceholder.typicode.com/users'
)

useSeoMeta({
  title: 'Users',
  description: 'List of all users'
})

</script>

<template>
  <h1>Users</h1>

  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Could not load users.</p>
  <ul v-else>
    <!-- <li v-for="u in users" :key="u.id">
      {{ u.name }} ({{ u.email }})
    </li> -->

    <li v-for="u in users" :key="u.id">
      <NuxtLink :to="`/users/${u.id}`">{{ u.name }}</NuxtLink>
      ({{ u.email }})
    </li>
  </ul>
</template>