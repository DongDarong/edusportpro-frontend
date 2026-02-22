<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
    <StatCard color="lime" title="Total Teams" value="12" />
    <StatCard color="cyan" title="Total Players" value="245" />
    <StatCard color="red" title="Upcoming Matches" value="5" />
    <StatCard color="yellow" title="Low Stock Items" value="8" />
  </div>
</template>

<script setup>
import StatCard from './StatCard.vue'
</script>
