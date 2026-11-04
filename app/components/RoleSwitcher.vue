<script setup>
const { role } = useAuth()
</script>

<template>
  <label>
    Logged in as:
    <select v-model="role">
      <option value="viewer">viewer</option>
      <option value="editor">editor</option>
      <option value="admin">admin</option>
    </select>
  </label>
</template>