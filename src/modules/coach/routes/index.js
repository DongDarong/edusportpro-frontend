import CoachDashboard from '../pages/CoachDashboard.vue'

export const coachRoutes = [
  {
    path: '/coach/dashboard',
    name: 'coach-dashboard',
    component: CoachDashboard,
    meta: { requiresAuth: true },
  },
]
