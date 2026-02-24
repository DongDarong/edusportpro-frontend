<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Loading...',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  tone: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'neutral'].includes(value),
  },
})
</script>

<template>
  <div class="loading" :class="[`loading--${size}`, `loading--${tone}`]" role="status" aria-live="polite">
    <span class="loading__spinner" aria-hidden="true"></span>
    <span class="loading__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--spinner-color, var(--hope-o-cyan-blue));
  font-size: 0.85rem;
}

.loading__spinner {
  width: var(--spinner-size, 1.25rem);
  height: var(--spinner-size, 1.25rem);
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: var(--spinner-color, var(--hope-o-cyan-blue));
  animation: spin 0.9s linear infinite;
}

.loading__label {
  font-size: var(--loading-label-size, 0.75rem);
}

.loading--sm {
  --spinner-size: 1rem;
  --loading-label-size: 0.68rem;
}

.loading--md {
  --spinner-size: 1.25rem;
  --loading-label-size: 0.75rem;
}

.loading--lg {
  --spinner-size: 1.5rem;
  --loading-label-size: 0.82rem;
}

.loading--primary {
  --spinner-color: var(--hope-o-cyan-blue);
}

.loading--neutral {
  --spinner-color: var(--hope-tagline-dark);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
