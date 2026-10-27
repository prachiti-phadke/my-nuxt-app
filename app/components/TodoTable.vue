<script setup>
defineProps({ todos: Array })
defineEmits(['toggle', 'remove', 'edit'])
</script>

<template>
    <!-- the message shown when the list is empty -->
  <el-table :data="todos" empty-text="No tasks yet">
    <el-table-column width="60">
      <template #default="{ row }">

      <!-- shows current value @change announces the click and the table never changes done itself -->
        <el-checkbox :model-value="row.done" @change="$emit('toggle', row.id)" />
      </template>
    </el-table-column>

    <el-table-column label="Task">
      <template #default="{ row }">
        <span :class="{ done: row.done }">{{ row.text }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Status" width="120">
      <template #default="{ row }">

      <!-- a small coloured label -->
        <el-tag :type="row.done ? 'success' : 'warning'">
          {{ row.done ? 'Done' : 'Pending' }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Actions" width="120">
      <template #default="{ row }">
        <el-button size="small" @click="$emit('edit', row)">Edit</el-button>

      <!-- a small “are you sure?” bubble. The button goes in the #reference slot, and @confirm fires only if the person confirms. -->
        <el-popconfirm title="Delete this task?" @confirm="$emit('remove', row.id)">
          <template #reference>
            <el-button type="danger" size="small">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.done { text-decoration: line-through; opacity: 0.6; }
</style>