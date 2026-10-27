<script setup>
const visible = defineModel()                    // open or closed, controlled by the page
const props = defineProps({ todo: Object })      // the task being edited
const emit = defineEmits(['save'])

const text = ref('')

// every time the popup opens, fill the box with the task's current text
watch(visible, (isOpen) => {
  if (isOpen && props.todo) text.value = props.todo.text
})

function submit() {
  const value = text.value.trim()
  if (!value) return
  emit('save', props.todo.id, value)
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="Edit task" width="400px">
    <el-input v-model="text" @keyup.enter="submit" />

    <template #footer>
      <el-button @click="visible = false">Cancel</el-button>
      <el-button type="primary" @click="submit">Save</el-button>
    </template>
  </el-dialog>
</template>