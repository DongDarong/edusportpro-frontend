<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div :class="`absolute top-0 left-0 w-1.5 h-full bg-hope-${color}`"></div>

    <div>
      <p class="text-gray-500 text-sm font-medium">{{ title }}</p>
      <h2 class="text-2xl md:text-3xl font-bold text-hope-dark mt-2">
        {{ value }}
      </h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String
})
</script>
