<script setup>
import { storeToRefs } from 'pinia'
import { useApiTodosStore } from '~/stores/apiTodos'

const store = useApiTodosStore()
const { todos, loading, error } = storeToRefs(store)

onMounted(() => store.fetchTodos())
</script>

<template>
  <h1>Axios test</h1>
  <p v-if="error">Could not load todos: {{ error }}</p>
  <el-table v-else v-loading="loading" :data="todos">
    <el-table-column prop="id" label="Id" width="80" />
    <el-table-column prop="title" label="Title" />
    <el-table-column prop="completed" label="Done" width="100" />
  </el-table>
</template>