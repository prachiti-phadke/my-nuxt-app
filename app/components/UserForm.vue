<script setup>
const props = defineProps({ user: Object })      // null = adding, an object = editing
const emit = defineEmits(['save', 'cancel'])

const emptyForm = () => ({ name: '', email: '', role: '' })
const form = ref(emptyForm())                    // the half-typed text lives only here

// whenever the user being edited changes, refill the boxes (or empty them)
watch(() => props.user, (u) => {
  form.value = u
    ? { name: u.name, email: u.email, role: u.role }
    : emptyForm()
}, { immediate: true })

function submit() {
  emit('save', form.value)       // announce the finished data first
  form.value = emptyForm()       // then clear the boxes
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" placeholder="Email" />
    <input v-model="form.role" placeholder="Role" />
    <button type="submit">{{ user ? 'Update' : 'Add' }}</button>
    <button v-if="user" type="button" @click="emit('cancel')">Cancel</button>
  </form>
</template>