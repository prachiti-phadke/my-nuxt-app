import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const cookie = useCookie('auth-user')            // saved in the browser
  const user = ref(cookie.value ?? null)           // start from the cookie, if there is one
  const isLoggedIn = computed(() => user.value !== null)

  function login(name) {
    user.value = { name }
    cookie.value = user.value                      // save it
  }

  function logout() {
    user.value = null
    cookie.value = null                            // clear it
  }

  return { user, isLoggedIn, login, logout }
})