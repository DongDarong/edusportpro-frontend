<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
    <h2 class="text-lg font-bold text-hope-dark mb-5">Recent Activity</h2>

    <ul class="relative border-l border-gray-200 ml-2 space-y-6">
      <ActivityItem text="New user added: Coach Dara" time="2 hours ago" color="lime"/>
      <ActivityItem text="Match scheduled" time="5 hours ago" color="cyan"/>
    </ul>
  </div>
</template>

<script setup>
import ActivityItem from './ActivityItem.vue'
</script>
