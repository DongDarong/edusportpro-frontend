<script setup>
import { onMounted, ref } from 'vue'

// Components
import MainLayout from '../../../components/layout/MainLayout.vue'
import Navbar from '../../../components/layout/Navbar.vue'
import Sidebar from '../../../components/layout/Sidebar.vue'
import HeaderSection from '../../../components/dashboard/HeaderSection.vue'
import StatsCards from '../../../components/dashboard/StatsCards.vue'
import TournamentHighlights from '../../../components/dashboard/TournamentHighlights.vue'
import LoadingSpinner from '../../../components/common/LoadingSpinner.vue'
import RecentActivities from '../../../components/dashboard/RecentActivities.vue'
import TeamsOverview from '../../../components/dashboard/TeamsOverview.vue'

import { getAdminDashboard } from '../../../services/adminService'

const loading = ref(true)
const loadError = ref('')
const summaryCards = ref([])
const recentActivities = ref([])
const teamsOverview = ref([])

async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  try {
    const { data } = await getAdminDashboard()
    summaryCards.value = data?.summaryCards ?? []
    recentActivities.value = data?.recentActivities ?? []
    teamsOverview.value = data?.teamsOverview ?? []
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Unable to load admin dashboard data.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <MainLayout>
    <template #navbar="{ toggleSidebar }">
      <Navbar @toggle-sidebar="toggleSidebar">
        <template #title>
          <h1 class="page-title">Admin Dashboard</h1>
        </template>
      </Navbar>
    </template>

    <template #sidebar="{ closeSidebar }">
      <Sidebar @close="closeSidebar" />
    </template>

    <section class="dashboard">
      <HeaderSection
        title="Dashboard Overview"
        subtitle="Welcome back, here's what's happening with your teams."
      />

      <div v-if="loading" class="dashboard__loading">
        <LoadingSpinner label="Loading admin dashboard" size="lg" />
      </div>

      <div v-else-if="loadError" class="dashboard__error">
        <p>{{ loadError }}</p>
        <button type="button" class="dashboard__retry" @click="loadDashboard">Retry</button>
      </div>

      <template v-else>
        <StatsCards :cards="summaryCards" :loading="false" :error="''" />

        <TournamentHighlights
          :activities="recentActivities"
          :loading="false"
          :error="''"
        />

        <div class="dashboard__detail-grid">
          <RecentActivities :activities="recentActivities" :loading="false" :error="''" />
          <TeamsOverview :teams="teamsOverview" />
        </div>
      </template>
    </section>
  </MainLayout>
</template>

<style scoped>
.page-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
}

.dashboard {
  display: grid;
  gap: 1rem;
}

.dashboard__loading {
  min-height: 260px;
  display: grid;
  place-items: center;
}

.dashboard__error {
  min-height: 180px;
  display: grid;
  place-items: center;
  gap: 0.6rem;
  text-align: center;
  border: 1px solid color-mix(in srgb, var(--hope-red) 35%, white);
  border-radius: 0.85rem;
  background: color-mix(in srgb, var(--hope-red) 8%, white);
  color: #8e1418;
  padding: 1rem;
}

.dashboard__retry {
  border: 1px solid color-mix(in srgb, var(--hope-red) 50%, white);
  background: #fff;
  color: #8e1418;
  border-radius: 0.55rem;
  padding: 0.45rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.dashboard__detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
