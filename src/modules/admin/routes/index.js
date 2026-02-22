import AdminDashboard from '../pages/AdminDashboard.vue'

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
]
