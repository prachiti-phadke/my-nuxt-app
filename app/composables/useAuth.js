const ROLE_PERMISSIONS = {
  viewer: ['posts:view'],
  editor: ['posts:view', 'users:view'],
  admin: ['posts:view', 'users:view', 'posts:delete'],
}

export const useAuth = () => {
  const role = useState('role', () => 'viewer')
  const can = (permission) =>
    ROLE_PERMISSIONS[role.value]?.includes(permission) ?? false
  return { role, can }
}