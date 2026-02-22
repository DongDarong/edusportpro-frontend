import { createRouter, createWebHistory } from 'vue-router'
import { adminRoutes } from '../modules/admin/routes'
import { coachRoutes } from '../modules/coach/routes'
import { playerRoutes } from '../modules/player/routes'
import Login from '../pages/auth/Login.vue'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  {
    path: '/',
    redirect: '/admin/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  ...adminRoutes,
  ...coachRoutes,
  ...playerRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const { isAuthenticated } = useAuthStore()

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login' })
  }
  return next()
})

export default router
