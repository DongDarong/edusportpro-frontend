<script setup>
import LoadingSpinner from '../common/LoadingSpinner.vue'

const props = defineProps({
  cards: {
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

function accentClass(status) {
  return `stats__card--${status || 'info'}`
}

function icon(status) {
  const key = (status || 'info').toLowerCase()

  if (key === 'success') {
    return 'M5 13l4 4L19 7'
  }

  if (key === 'warning') {
    return 'M12 8v4m0 4h.01M10.3 3.86l-7.5 13a1 1 0 00.87 1.5h16.66a1 1 0 00.87-1.5l-7.5-13a1 1 0 00-1.74 0z'
  }

  if (key === 'error') {
    return 'M6 18L18 6M6 6l12 12'
  }

  return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}
</script>

<template>
  <section class="stats">
    <div v-if="loading" class="stats__state">
      <LoadingSpinner label="Loading summary cards" size="md" />
    </div>
    <div v-else-if="error" class="stats__state stats__state--error">{{ error }}</div>

    <div v-else class="stats__grid">
      <article v-for="card in cards" :key="card.title" class="stats__card" :class="accentClass(card.status)">
        <div class="stats__head">
          <p class="stats__title">{{ card.title }}</p>
          <span class="stats__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path :d="icon(card.status)" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <p class="stats__value">{{ card.value }}</p>
        <p class="stats__meta">{{ card.label }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.stats__state {
  border: 1px dashed rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
  padding: 1rem;
  color: color-mix(in srgb, var(--hope-dark) 70%, white);
}

.stats__state--error {
  border-color: color-mix(in srgb, var(--hope-red) 45%, white);
  color: #8e1418;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  gap: 0.8rem;
}

.stats__card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  padding: 0.9rem;
  background: #fff;
  border-top: 4px solid var(--accent, var(--hope-cyan));
}

.stats__card--success {
  --accent: var(--hope-lime);
}

.stats__card--info {
  --accent: var(--hope-cyan);
}

.stats__card--warning {
  --accent: var(--hope-yellow);
}

.stats__card--error {
  --accent: var(--hope-red);
}

.stats__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.5rem;
}

.stats__title {
  margin: 0;
  font-size: 0.82rem;
  color: color-mix(in srgb, var(--hope-dark) 65%, white);
}

.stats__icon {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent, var(--hope-cyan));
  background: color-mix(in srgb, var(--accent, var(--hope-cyan)) 12%, white);
}

.stats__icon svg {
  width: 1rem;
  height: 1rem;
}

.stats__value {
  margin: 0.45rem 0 0;
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--hope-dark);
}

.stats__meta {
  margin: 0.22rem 0 0;
  font-size: 0.8rem;
  color: color-mix(in srgb, var(--hope-dark) 60%, white);
}
</style>
