<script setup>
import TournamentBanner from './TournamentBanner.vue'
import LiveActivityPanel from './LiveActivityPanel.vue'
import TodayMatchesPanel from './TodayMatchesPanel.vue'

const props = defineProps({
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
</script>

<template>
  <section class="highlights">
    <TournamentBanner />

    <div class="highlights__grid">
      <LiveActivityPanel :activities="props.activities" :loading="props.loading" :error="props.error" />
      <TodayMatchesPanel />
    </div>
  </section>
</template>

<style scoped>
.highlights {
  display: grid;
  gap: 0.9rem;
}

.highlights__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.9rem;
}
</style>
