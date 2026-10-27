<script setup>
import { storeToRefs } from 'pinia'
import { useTodosStore } from '~/stores/todos'

const store = useTodosStore()
const { todos, remaining } = storeToRefs(store)
const { addTodo, toggleTodo, removeTodo, updateTodo, loadTodos } = store

onMounted(() => {
  loadTodos()
})

// edit popup
const dialogVisible = ref(false)
const editingTodo = ref(null)

function openEdit(todo) {
  editingTodo.value = todo
  dialogVisible.value = true
}

// search and filter
const search = ref('')
const filter = ref('all')            // 'all' | 'active' | 'done'

const filteredTodos = computed(() => {
  return todos.value
    .filter((t) => t.text.toLowerCase().includes(search.value.toLowerCase()))
    .filter((t) => {
      if (filter.value === 'active') return !t.done
      if (filter.value === 'done') return t.done
      return true
    })
})
</script>

<template>
  <h1>Todos</h1>
  <p>{{ remaining }} left</p>

  <TodoForm @add="addTodo" />

  <div class="toolbar">
    <el-input v-model="search" placeholder="Search tasks" clearable />
    <el-radio-group v-model="filter">
      <el-radio-button label="All" value="all" />
      <el-radio-button label="Active" value="active" />
      <el-radio-button label="Done" value="done" />
    </el-radio-group>
  </div>

  <TodoTable
    :todos="filteredTodos"
    @toggle="toggleTodo"
    @remove="removeTodo"
    @edit="openEdit"
  />

  <TodoEditDialog
    v-model="dialogVisible"
    :todo="editingTodo"
    @save="updateTodo"
  />
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}
</style>