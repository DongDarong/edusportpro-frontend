<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 col-span-1">
    <h2 class="text-base md:text-lg font-bold text-hope-dark mb-4 md:mb-5 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-hope-yellow"></span>
      Recent Activity
    </h2>

    <p v-if="loading" class="text-xs md:text-sm text-gray-500">Loading recent activity...</p>
    <p v-else-if="error" class="text-xs md:text-sm text-red-700">{{ error }}</p>

    <ul v-else class="relative border-l border-gray-200 ml-1.5 md:ml-2 space-y-4 md:space-y-6">
      <li v-for="activity in activities" :key="activity.id" class="ml-5 md:ml-6">
        <span
          class="absolute -left-1.5 mt-1.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white"
          :class="dotClass(activity.status)"
        ></span>
        <p class="text-xs md:text-sm font-medium text-hope-dark leading-snug">{{ activity.message }}</p>
        <p class="text-[11px] md:text-xs text-gray-500">{{ activity.time }}</p>
      </li>
      <li v-if="!activities.length" class="ml-5 md:ml-6">
        <p class="text-xs md:text-sm text-gray-500">No recent activity found.</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

function dotClass(status) {
  const value = (status || '').toLowerCase()
  if (value === 'success') return 'bg-hope-lime'
  if (value === 'warning') return 'bg-hope-yellow'
  if (value === 'error') return 'bg-hope-red'
  if (value === 'pending') return 'bg-sky-500'
  return 'bg-hope-cyan'
}
</script>
