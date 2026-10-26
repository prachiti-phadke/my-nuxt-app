<script setup>
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>Home page</h1>
  <p>Count: {{ counter.count }} / Double: {{ counter.double }}</p>
  <button @click="counter.increase">+1</button>
</template>