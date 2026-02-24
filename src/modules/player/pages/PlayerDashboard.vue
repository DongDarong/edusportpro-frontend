<script setup>
import { onMounted, ref } from 'vue'
import MainLayout from '../../../components/layout/MainLayout.vue'
import Navbar from '../../../components/layout/Navbar.vue'
import Sidebar from '../../../components/layout/Sidebar.vue'
import StatusBadge from '../../../components/common/StatusBadge.vue'
import LoadingSpinner from '../../../components/common/LoadingSpinner.vue'
import { getPlayerDashboard } from '../../../services/playerService'

const loading = ref(true)
const loadError = ref('')
const summaryCards = ref([])
const nextActivities = ref([])

async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  try {
    const { data } = await getPlayerDashboard()
    summaryCards.value = data?.summaryCards ?? []
    nextActivities.value = data?.nextActivities ?? []
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Unable to load player dashboard data.'
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
          <h1 class="page-title">Player Dashboard</h1>
        </template>
      </Navbar>
    </template>

    <template #sidebar="{ closeSidebar }">
      <Sidebar @close="closeSidebar" />
    </template>

    <section class="dashboard">
      <div v-if="loading" class="dashboard__state">
        <LoadingSpinner label="Loading player data" size="md" />
      </div>

      <div v-else-if="loadError" class="dashboard__state dashboard__state--error">
        <p>{{ loadError }}</p>
        <button type="button" class="dashboard__retry" @click="loadDashboard">Retry</button>
      </div>

      <template v-else>
        <div class="dashboard__summary">
          <article v-for="card in summaryCards" :key="card.title" class="dashboard__card">
            <p class="dashboard__card-title">{{ card.title }}</p>
            <p class="dashboard__card-value">{{ card.value }}</p>
            <p class="dashboard__card-meta">{{ card.label }}</p>
            <StatusBadge :status="card.status" size="sm" />
          </article>
        </div>

        <article class="dashboard__panel">
          <header class="dashboard__panel-head">
            <h2>Today's Activities</h2>
            <StatusBadge status="info" label="Plan" :dot="true" size="sm" />
          </header>

          <ul class="dashboard__activity">
            <li v-for="activity in nextActivities" :key="activity.id" class="dashboard__activity-item">
              <div>
                <p class="dashboard__activity-message">{{ activity.title }}</p>
                <p class="dashboard__activity-time">{{ activity.time }} - {{ activity.location }}</p>
              </div>
              <StatusBadge :status="activity.status" size="sm" />
            </li>
          </ul>
        </article>
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

.dashboard__state {
  min-height: 180px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.8rem;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.03);
}

.dashboard__state--error {
  padding: 1rem;
  text-align: center;
  color: #fbb2b2;
}

.dashboard__retry {
  margin-top: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  border-radius: 0.6rem;
  padding: 0.45rem 0.7rem;
  cursor: pointer;
}

.dashboard__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.75rem;
}

.dashboard__card {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.9rem;
  display: grid;
  gap: 0.35rem;
}

.dashboard__card-title {
  margin: 0;
  opacity: 0.8;
  font-size: 0.8rem;
}

.dashboard__card-value {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.dashboard__card-meta {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.85;
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
