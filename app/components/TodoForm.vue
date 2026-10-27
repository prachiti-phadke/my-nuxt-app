<script setup>
const emit = defineEmits(['add'])

const formRef = ref(null)           // lets us call validate() on the form
const form = reactive({ text: '' })

const rules = {
  text: [
    { required: true, whitespace: true, message: 'Please enter a task', trigger: 'blur' },
    { min: 3, message: 'At least 3 characters', trigger: 'blur' },
  ],
}

async function submit() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return                 // stop here if a rule failed
  emit('add', form.text.trim())      // announce first
  formRef.value.resetFields()        // then clear the box and the error messages
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" inline @submit.prevent="submit">
    <el-form-item prop="text">
      <el-input v-model="form.text" placeholder="What needs to be done?" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Add</el-button>
    </el-form-item>
  </el-form>
</template>