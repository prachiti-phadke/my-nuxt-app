<script setup>
defineProps({ users: Array })
defineEmits(['edit', 'remove'])
</script>

<template>
  <ul>
    <li v-for="u in users" :key="u.id">
      {{ u.name }} - {{ u.role }}
      <button @click="$emit('edit', u)">Edit</button>
      <button @click="$emit('remove', u.id)">Delete</button>
    </li>
  </ul>
</template>