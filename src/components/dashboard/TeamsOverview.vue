<script setup>
import StatusBadge from '../common/StatusBadge.vue'

defineProps({
  teams: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 col-span-1 lg:col-span-2">
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-lg font-bold text-hope-dark flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-hope-cyan"></span>
        Teams Overview
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Team</th>
            <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Coach</th>
            <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Players</th>
            <th class="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="team in teams" :key="team.id || team.name">
            <td class="py-3 px-4 text-sm font-medium text-hope-dark whitespace-nowrap">{{ team.name }}</td>
            <td class="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{{ team.coach }}</td>
            <td class="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{{ team.players }}</td>
            <td class="py-3 px-4 whitespace-nowrap">
              <StatusBadge :status="team.status || 'info'" size="sm" />
            </td>
          </tr>
          <tr v-if="!teams.length">
            <td colspan="4" class="py-4 px-4 text-sm text-gray-500">No teams available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
