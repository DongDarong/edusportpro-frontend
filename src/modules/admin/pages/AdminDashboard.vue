<script setup>
import { onMounted, ref } from 'vue'
import MainLayout from '../../../components/layout/MainLayout.vue'
import Navbar from '../../../components/layout/Navbar.vue'
import Sidebar from '../../../components/layout/Sidebar.vue'
import HeaderSection from '../../../components/dashboard/HeaderSection.vue'
import StatsCards from '../../../components/dashboard/StatsCards.vue'
import StatusBadge from '../../../components/common/StatusBadge.vue'
import { getAdminDashboard } from '../../../services/adminService'

const loading = ref(true)
const loadError = ref('')
const summaryCards = ref([])
const recentActivities = ref([])

async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  try {
    const { data } = await getAdminDashboard()
    summaryCards.value = data?.summaryCards ?? []
    recentActivities.value = data?.recentActivities ?? []
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

      <StatsCards :cards="summaryCards" :loading="loading" :error="loadError" />

      
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

.dashboard__panel {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.9rem;
}

.dashboard__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.dashboard__panel-head h2 {
  margin: 0;
  font-size: 1rem;
}

.dashboard__activity {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.dashboard__activity-item {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.65rem;
  padding: 0.65rem;
}

.dashboard__activity-message {
  margin: 0;
  font-size: 0.9rem;
}

.dashboard__activity-time {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  opacity: 0.78;
}
</style>
