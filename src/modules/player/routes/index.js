import PlayerDashboard from '../pages/PlayerDashboard.vue'

export const playerRoutes = [
  {
    path: '/player/dashboard',
    name: 'player-dashboard',
    component: PlayerDashboard,
    meta: { requiresAuth: true },
  },
]
