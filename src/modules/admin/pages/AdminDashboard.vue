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
import StandingsPreview from '../../../components/dashboard/StandingsPreview.vue'
import TopScorers from '../../../components/dashboard/TopScorers.vue'

import { getAdminDashboard } from '../../../services/adminService'

const loading = ref(true)
const loadError = ref('')
const summaryCards = ref([])
const recentActivities = ref([])
const teamsOverview = ref([])
const standingsPreview = ref([])
const topScorers = ref([])

async function loadDashboard() {
  loading.value = true
  loadError.value = ''

  try {
    const { data } = await getAdminDashboard()
    summaryCards.value = data?.summaryCards ?? []
    recentActivities.value = data?.recentActivities ?? []
    teamsOverview.value = data?.teamsOverview ?? []
    standingsPreview.value = data?.standingsPreview ?? []
    topScorers.value = data?.topScorers ?? []
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
          <h1 class="m-0 text-[1.15rem] font-bold max-[768px]:hidden">Organization for Children’s Hope Foundation of Cambodia</h1>
        </template>
      </Navbar>
    </template>

    <template #sidebar="{ closeSidebar }">
      <Sidebar @close="closeSidebar" />
    </template>

    <section class="grid gap-4 max-[640px]:gap-3.5 max-[420px]:gap-2.5">

      <div v-if="loading" class="flex min-h-[260px] items-center justify-center max-[640px]:min-h-[180px]">
        <LoadingSpinner label="Loading admin dashboard" size="lg" />
      </div>

      <div
        v-else-if="loadError"
        class="grid min-h-[180px] place-items-center gap-2.5 rounded-[0.85rem] border border-[color-mix(in_srgb,var(--hope-red)_35%,white)] bg-[color-mix(in_srgb,var(--hope-red)_8%,white)] p-4 text-center text-[#8e1418] max-[640px]:min-h-[140px] max-[640px]:p-3.5 max-[640px]:text-[0.88rem]"
      >
        <p>{{ loadError }}</p>
        <button
          type="button"
          class="cursor-pointer rounded-[0.55rem] border border-[color-mix(in_srgb,var(--hope-red)_50%,white)] bg-white px-3 py-1.5 font-semibold text-[#8e1418] transition-all hover:bg-red-50 max-[640px]:px-2.5 max-[640px]:py-1.5 max-[640px]:text-[0.82rem]"
          @click="loadDashboard"
        >
          Retry
        </button>
      </div>

      <template v-else>
          <HeaderSection
        title="Dashboard Overview"
        subtitle="Welcome back, here's what's happening with your teams."
          />

        <StatsCards :cards="summaryCards" :loading="false" :error="''" />

        <TournamentHighlights
          class="[&_.highlights__grid]:max-[640px]:grid-cols-1 [&_.highlights__grid]:max-[640px]:gap-3"
          :activities="recentActivities"
          :loading="false"
          :error="''"
        />

        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 max-[640px]:grid-cols-1 max-[640px]:gap-3.5 max-[420px]:gap-2.5">
          <RecentActivities
            class="max-[640px]:!p-3.5 max-[420px]:!rounded-[0.75rem] max-[420px]:!p-3"
            :activities="recentActivities"
            :loading="false"
            :error="''"
          />
          <TeamsOverview
            class="max-[640px]:!p-3.5 max-[420px]:!rounded-[0.75rem] max-[420px]:!p-3 [&_table]:max-[640px]:text-[0.82rem]"
            :teams="teamsOverview"
          />
        </div>

        <div class="grid grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-4 max-[960px]:grid-cols-1 max-[640px]:gap-3.5 max-[420px]:gap-2.5">
          <StandingsPreview
            class="max-[420px]:!rounded-[0.75rem] max-[420px]:!p-3"
            :standings="standingsPreview"
          />
          <TopScorers
            class="max-[420px]:!rounded-[0.75rem] max-[420px]:!p-3"
            :scorers="topScorers"
          />
        </div>
      </template>
    </section>
  </MainLayout>
</template>

