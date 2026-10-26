export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  removeUser(id)
  return { ok: true }
})