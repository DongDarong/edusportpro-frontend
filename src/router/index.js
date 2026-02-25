import { createRouter, createWebHistory } from 'vue-router'
import { adminRoutes } from '../modules/admin/routes'
import { coachRoutes } from '../modules/coach/routes'
import { playerRoutes } from '../modules/player/routes'
import Login from '../pages/auth/Login.vue'
import RoleDashboard from '../pages/RoleDashboard.vue'
import { useAuthStore } from '../stores/auth.js'

function dashboardForRole(role) {
  const normalizedRole = String(role ?? '').toLowerCase()
  return ['admin', 'coach', 'player'].includes(normalizedRole) ? '/dashboard' : '/login'
}

const routes = [
  {
    path: '/',
    redirect: () => {
      const { state, isAuthenticated } = useAuthStore()
      if (!isAuthenticated.value) return '/login'
      return dashboardForRole(state.user?.role)
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: RoleDashboard,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'coach', 'player'] },
  },
  ...adminRoutes,
  ...coachRoutes,
  ...playerRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, state } = useAuthStore()

  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login' })
  }

  if (!to.meta?.requiresAuth) {
    return next()
  }

  const currentRole = String(state.user?.role ?? '').toLowerCase()
  const allowedRoles = Array.isArray(to.meta?.allowedRoles) ? to.meta.allowedRoles : []

  if (allowedRoles.length && !allowedRoles.includes(currentRole)) {
    return next(dashboardForRole(currentRole))
  }

  return next()
})

export default router
