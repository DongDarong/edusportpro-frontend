<script setup>
import { computed } from 'vue'

const props = defineProps({
  activePath: {
    type: String,
    required: true,
  },
  activeRole: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navigate'])
const dashboardPath = '/player/dashboard'
const isActive = computed(() => props.activePath === dashboardPath)

function onNavigate() {
  emit('navigate')
}
</script>

<template>
  <section class="role-section" :class="{ 'role-section--active': activeRole }">
    <h2 class="role-section__title">Player</h2>
    <RouterLink
      :to="dashboardPath"
      class="role-section__link"
      :class="{ 'role-section__link--active': isActive }"
      @click="onNavigate"
    >
      Dashboard
    </RouterLink>
  </section>
</template>

<style scoped>
.role-section {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.65rem;
  padding: 0.55rem;
  display: grid;
  gap: 0.3rem;
}

.role-section--active {
  border-color: var(--hope-o-cyan-blue);
  background: color-mix(in oklab, var(--hope-o-cyan-blue) 8%, transparent);
}

.role-section__title {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.role-section__link {
  display: block;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.6rem 0.7rem;
  border-radius: 0.55rem;
}

.role-section__link:hover {
  background: var(--hope-e-golden-yellow);
}

.role-section__link--active {
  background: color-mix(in oklab, var(--hope-o-cyan-blue) 18%, white);
  color: var(--color-text);
  border: 1px solid var(--hope-o-cyan-blue);
}
</style>
