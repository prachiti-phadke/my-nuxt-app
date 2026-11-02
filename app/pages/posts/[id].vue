<script setup>
// useRoute gives information about the address that is open right now
const route = useRoute()

// For /posts/5, route.params.id is "5". The name "id" comes from the file name [id].vue
const id = route.params.id

// Fetch just this one post. useFetch runs on the server first, so the page arrives filled in.
const { data: post, pending, error } = await useFetch(
  `https://jsonplaceholder.typicode.com/posts/${id}`
)
</script>

<template>
  <!-- A link back to the table page -->
  <NuxtLink to="/">Back to all posts</NuxtLink>

  <p v-if="pending">Loading...</p>

  <!-- A post that doesn't exist makes the API answer 404, which lands here -->
  <p v-else-if="error">Post not found</p>

  <div v-else>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </div>
</template>