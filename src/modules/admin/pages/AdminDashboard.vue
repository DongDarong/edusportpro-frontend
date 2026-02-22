<script setup>
import Layout from '../../../components/layout/Layout.vue'
import Navbar from '../../../components/layout/Navbar.vue'
import Sidebar from '../../../components/layout/Sidebar.vue'
import DashboardHeader from '../../../components/ui/HeaderSection.vue'
import StatsGrid from '../../../components/dashboard/StatsGrid.vue'
import ActivityPanel from '../../../components/dashboard/ActivityPanel.vue'
import TeamsTable from '../../../components/dashboard/TeamsTable.vue'
import MatchesTable from '../../../components/dashboard/MatchesTable.vue'
</script>

<template>
  <Layout>
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
        <main class="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          <DashboardHeader />
          <StatsGrid />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <ActivityPanel />
            <TeamsTable />
          </div>
          <MatchesTable />
        </main>
    </section>
  </Layout>
</template>

