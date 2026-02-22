<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 col-span-1 lg:col-span-2">
    <h2 class="text-lg font-bold text-hope-dark mb-5">Teams Overview</h2>

    <table class="min-w-full">
      <tbody>
        <TeamRow team="Team A" coach="Coach Sok" players="20" status="Active"/>
        <TeamRow team="Team B" coach="Coach Vuthy" players="16" status="Training"/>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import TeamRow from './TeamRow.vue'
</script>
