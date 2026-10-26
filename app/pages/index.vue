<script setup>
const { count, increase } = useCounter()
</script>

<template>
  <h1>Home page</h1>
  <Greeting />
  <button @click="increase">Clicked {{ count }} times</button>
</template>