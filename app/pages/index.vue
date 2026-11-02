<script setup>
// ---------- IMPORTS ----------
import { storeToRefs } from 'pinia'
import { usePostsStore } from '~/stores/posts'

// ---------- STORE ----------
const store = usePostsStore()
// State and getters go through storeToRefs so they stay connected to the store
const { posts, loading, error, total } = storeToRefs(store)

// Load the list as soon as the page appears in the browser
onMounted(() => store.fetchPosts())

// ---------- FORM STATE (only this page needs it, so it lives here) ----------
const dialogVisible = ref(false)     // is the popup open?
const editingId = ref(null)          // null = adding a post, a number = editing that post
const formRef = ref(null)            // lets us call validate() on the form
const form = reactive({ title: '', body: '' })

// Rules checked before anything is sent. Element Plus shows the red message.
const rules = {
  title: [
    { required: true, whitespace: true, message: 'Please enter a title', trigger: 'blur' },
    { min: 3, message: 'At least 3 characters', trigger: 'blur' },
  ],
}

// ---------- OPEN THE POPUP ----------
function openAdd() {
  editingId.value = null             // adding, not editing
  form.title = ''
  form.body = ''
  dialogVisible.value = true
}

function openEdit(post) {
  editingId.value = post.id          // remember which post we are editing
  form.title = post.title            // copy its values into the form boxes
  form.body = post.body
  dialogVisible.value = true
}

// Runs whenever the popup finishes closing (Cancel, X, Esc, save)
function onClosed() {
  editingId.value = null
  formRef.value?.clearValidate()     // remove leftover red messages
}

// ---------- SAVE: create or update ----------
async function submit() {
  // Stop here if a rule failed. Nothing is sent to the server.
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  const data = { title: form.title.trim(), body: form.body.trim() }

  // null means "adding", so POST. A number means "editing", so PUT.
  const ok = editingId.value === null
    ? await store.addPost(data)
    : await store.updatePost(editingId.value, data)

  if (ok) {
    ElMessage.success(editingId.value === null ? 'Post added' : 'Post updated')
    dialogVisible.value = false
  } else {
    ElMessage.error(store.error || 'Something went wrong')
  }
}

// ---------- DELETE ----------
async function handleRemove(id) {
  const ok = await store.removePost(id)
  if (ok) ElMessage.success('Post deleted')
  else ElMessage.error(store.error || 'Could not delete')
}
</script>

<template>
  <!-- ---------- HEADER: title, count, and the Add button ---------- -->
  <div class="top">
    <h1>Posts ({{ total }})</h1>
    <el-button type="primary" @click="openAdd">Add post</el-button>
  </div>

  <!-- ---------- ERROR: shown only if loading the list failed ---------- -->
  <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />

  <!-- ---------- TABLE (the "R" in CRUD) ---------- -->
  <!-- v-loading shows a spinner while loading is true -->
  <el-table v-loading="loading" :data="posts" empty-text="No posts yet">
    <el-table-column prop="id" label="Id" width="80" />
    <el-table-column prop="title" label="Title" min-width="200" show-overflow-tooltip />
    <el-table-column prop="body" label="Body" min-width="250" show-overflow-tooltip />

    <el-table-column label="Actions" width="170">
      <template #default="{ row }" class="actions">

         <!-- NuxtLink turns the button into a link to /posts/<id> -->
        <NuxtLink :to="`/posts/${row.id}`">
            <el-button size="small">View</el-button>
        </NuxtLink>

        <!-- row is the post on this line of the table -->
        <el-button size="small" @click="openEdit(row)">Edit</el-button>
        <!-- popconfirm asks "are you sure?" and only fires @confirm if they agree -->
        <el-popconfirm title="Delete this post?" @confirm="handleRemove(row.id)">
          <template #reference>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- ---------- POPUP FORM (used for both Add and Edit) ---------- -->

 
  <el-dialog
    v-model="dialogVisible"
    :title="editingId === null ? 'Add post' : 'Edit post'"
    width="450px"
    @closed="onClosed"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <!-- prop="title" links this box to the "title" rule above -->
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Body" prop="body">
        <el-input v-model="form.body" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submit">Save</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>