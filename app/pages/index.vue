// useFetch() is a Nuxt composable used to fetch data from an API.
// It automatically handles API requests, loading states, and errors.

// API URL from which we want to fetch posts.
// const { data: posts, pending, error } = await useFetch(
//   'https://jsonplaceholder.typicode.com/posts'
// )

// data: Contains the response received from the API.
// We rename 'data' to 'posts' using aliasing (data: posts).
//
// pending: A boolean value that indicates whether the API request
// is still in progress. It is true while loading and false once completed.
//
// error: Contains error information if the API request fails.
// If the request is successful, error will be null.

 <!-- <template>
  <!-- Main heading of the page -->
  <!-- <h1>Posts</h1> -->

  <!-- Display Loading... while the API request is in progress -->
  <!-- <p v-if="pending">Loading...</p> -->

  <!-- Display an error message if the API request fails -->
  <!-- <p v-else-if="error">Something went wrong</p> -->

  <!-- Display the posts only when loading is complete and there is no error -->
  <!-- <ul v-else> -->

    <!--
      v-for loops through the posts array.
      post represents the current post in each iteration.

      posts.slice(0, 10) returns only the first 10 posts
      instead of displaying all the posts received from the API.

      :key="post.id" provides a unique identifier for each list item.
      Vue uses this key to efficiently track and update list elements.
    -->
    <!-- <li v-for="post in posts.slice(0, 10)" :key="post.id"> -->

      <!--
        NuxtLink is used for navigation between pages without
        performing a full browser page reload.

        :to dynamically generates the destination URL.

        post.userId gets the userId associated with the current post.

        Example:
        If post.userId = 1, the destination becomes /users/1.

        {{ post.title }} displays the title of the current post.
      -->
      <!-- <NuxtLink :to="`/users/${post.userId}`">
        {{ post.title }}
      </NuxtLink> -->

    <!-- </li>
  </ul>
</template> -->



<script setup>
const { can } = useAuth()
const { data: posts, pending, error } = await useFetch(
  'https://jsonplaceholder.typicode.com/posts'
)

function removePost(id) {
  posts.value = posts.value.filter((p) => p.id !== id)
}
</script>

<template>
  <h1>Posts</h1>
  <p v-if="pending">Loading...</p>
  <p v-else-if="error">Something went wrong</p>
  <ul v-else>
    <li v-for="post in posts.slice(0, 10)" :key="post.id">
      <NuxtLink v-if="can('users:view')" :to="`/users/${post.userId}`">
        {{ post.title }}
      </NuxtLink>
      <span v-else>{{ post.title }}</span>

      <button v-if="can('posts:delete')" @click="removePost(post.id)">
        Delete
      </button>
    </li>
  </ul>
</template>