export default defineNuxtRouteMiddleware(() => {
  const { can } = useAuth()
  if (!can('users:view')) return navigateTo('/')
})