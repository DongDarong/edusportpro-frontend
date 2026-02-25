<script setup>
import { computed } from 'vue'
import AdminDashboard from '../modules/admin/pages/AdminDashboard.vue'
import CoachDashboard from '../modules/coach/pages/CoachDashboard.vue'
import PlayerDashboard from '../modules/player/pages/PlayerDashboard.vue'
import { useAuthStore } from '../stores/auth.js'

const { state } = useAuthStore()

const roleComponentMap = {
  admin: AdminDashboard,
  coach: CoachDashboard,
  player: PlayerDashboard,
}

const currentRole = computed(() => String(state.user?.role ?? '').toLowerCase())
const currentDashboard = computed(() => roleComponentMap[currentRole.value] ?? null)
</script>

<template>
  <component :is="currentDashboard" v-if="currentDashboard" />
  <div v-else />
</template>
