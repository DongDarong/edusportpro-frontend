<template>
  <li class="ml-6">
    <span :class="`absolute -left-1.5 mt-1.5 w-3 h-3 bg-hope-${color} rounded-full border-2 border-white`"></span>
    <p class="text-sm font-medium text-hope-dark">{{ text }}</p>
    <p class="text-xs text-gray-500">{{ time }}</p>
  </li>
</template>

<script setup>
defineProps({
  text: String,
  time: String,
  color: String
})
</script>
