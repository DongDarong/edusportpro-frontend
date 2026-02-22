<template>
  <tr class="hover:bg-gray-50">
    <td class="py-3 px-4 font-medium text-hope-dark">{{ team }}</td>
    <td class="py-3 px-4 text-gray-600">{{ coach }}</td>
    <td class="py-3 px-4 text-gray-600">{{ players }}</td>
    <td class="py-3 px-4">{{ status }}</td>
  </tr>
</template>

<script setup>
defineProps({
  team: String,
  coach: String,
  players: String,
  status: String
})
</script>
