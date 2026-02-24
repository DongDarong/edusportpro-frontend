<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard Overview',
  },
  subtitle: {
    type: String,
    default: "Welcome back, here's what's happening with your teams.",
  },
})
</script>

<template>
  <header class="header-section">
    <h2 class="header-section__title">{{ props.title }}</h2>
    <p class="header-section__subtitle">{{ props.subtitle }}</p>
  </header>
</template>

<style scoped>
.header-section {
  margin-bottom: 1rem;
}

.header-section__title {
  margin: 0;
  font-size: clamp(1.35rem, 2.2vw, 1.95rem);
  font-weight: 800;
  color: var(--hope-dark);
}

.header-section__subtitle {
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  color: color-mix(in srgb, var(--hope-dark) 62%, white);
}
</style>
