<script setup>

// useRoute() is a Nuxt composable that gives access to the
// current route information, including URL parameters.

const route = useRoute()

definePageMeta({ middleware: 'users-guard' })

// useFetch() makes an API request to retrieve user details.
//
// route.params.id dynamically retrieves the ID from the URL.
//
// For example, if the URL is /users/1,
// route.params.id will return 1.
//
// The API URL will become:
// https://jsonplaceholder.typicode.com/users/1

// data: user renames the returned 'data' property to 'user'.
// error stores error information if the API request fails.

const { data: user, error } = await useFetch(
  `https://jsonplaceholder.typicode.com/users/${route.params.id}`
)

</script>

<template>

  <!-- NuxtLink navigates the user back to the homepage.
       'to="/" ' means the root route (homepage). -->

  <NuxtLink to="/">← Back</NuxtLink>

  <!-- v-if checks whether the API request resulted in an error.
       If an error occurs, display 'User not found'. -->

  <p v-if="error">User not found</p>

  <!-- v-else-if checks whether user data is available.
       If user contains data, display the user's information. -->

  <div v-else-if="user">

    <!-- Display the user's name received from the API. -->
    <h1>{{ user.name }}</h1>

    <!-- Display the user's email address. -->
    <p>{{ user.email }}</p>

    <!-- Display the user's phone number. -->
    <p>{{ user.phone }}</p>

    <!-- Display the user's website. -->
    <p>{{ user.website }}</p>

  </div>

</template>