<template>
  <div>
    <header>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/contact">Contact</NuxtLink> |
      <NuxtLink to="/products">Products</NuxtLink>
    </header>

    <main>
      <slot />
    </main>

    <footer>My Nuxt app</footer>
  </div>
</template>