let users = [
  { id: 1, name: 'Asha', email: 'asha@mail.com', role: 'Admin' },
  { id: 2, name: 'Ravi', email: 'ravi@mail.com', role: 'Editor' },
  { id: 3, name: 'Meera', email: 'meera@mail.com', role: 'Viewer' },
]

export function getUsers() {
  return users
}

export function addUser(data) {
  const user = { id: Date.now(), ...data }
  users.push(user)
  return user
}

export function updateUser(id, data) {
  users = users.map((u) => (u.id === id ? { id: u.id, ...data } : u))
  return users.find((u) => u.id === id)
}

export function removeUser(id) {
  users = users.filter((u) => u.id !== id)
}