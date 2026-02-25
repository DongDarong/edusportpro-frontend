import AdminUsers from '../pages/AdminUsers.vue'

export const adminRoutes = [
  {
    path: '/users',
    name: 'admin-users',
    component: AdminUsers,
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
  },
  {
    path: '/admin/dashboard',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/users',
    redirect: '/users',
    meta: { requiresAuth: true },
  },
]
