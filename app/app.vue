<!-- app/app.vue : the shell around every page -->
<template>
  <div class="shell">
    <h2>Posts App</h2>
    <!-- NuxtPage is the placeholder where the current page appears -->
    <NuxtPage />
  </div>
</template>

<style>
.shell {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
}
</style>