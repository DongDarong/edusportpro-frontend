<script setup>
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
  <article class="panel">
    <h4>Live Activity</h4>
    <p v-if="props.loading" class="panel__state">Loading highlights...</p>
    <p v-else-if="props.error" class="panel__state panel__state--error">{{ props.error }}</p>
    <ul v-else class="panel__list">
      <li v-for="item in props.activities.slice(0, 3)" :key="item.id" class="panel__row">
        <div>
          <p class="panel__main">{{ item.message }}</p>
          <p class="panel__sub">{{ item.time }}</p>
        </div>
        <span class="pill" :class="`pill--${item.status || 'info'}`">{{ item.status || 'info' }}</span>
      </li>
      <li v-if="!props.activities.length" class="panel__state">No live activity.</li>
    </ul>
  </article>
</template>

<style scoped>
.panel {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.85rem;
  background: #fff;
  padding: 0.9rem;
}

.panel h4 {
  margin: 0 0 0.65rem;
  font-size: 1rem;
}

.panel__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.55rem;
}

.panel__row {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  align-items: center;
  padding: 0.55rem;
  border-radius: 0.6rem;
  background: #f8fafc;
}

.panel__main {
  margin: 0;
  font-size: 0.9rem;
  color: var(--hope-dark);
}

.panel__sub {
  margin: 0.18rem 0 0;
  font-size: 0.78rem;
  color: color-mix(in srgb, var(--hope-dark) 62%, white);
}

.panel__state {
  margin: 0;
  font-size: 0.86rem;
  color: color-mix(in srgb, var(--hope-dark) 62%, white);
}

.panel__state--error {
  color: #8e1418;
}

.pill {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.18rem 0.45rem;
  color: #fff;
}

.pill--success { background: var(--hope-lime); }
.pill--info { background: var(--hope-cyan); }
.pill--warning { background: var(--hope-yellow); color: #6d5700; }
.pill--pending { background: #3d93b5; }
.pill--error { background: var(--hope-red); }

@media (max-width: 640px) {
  .panel {
    padding: 0.75rem;
    border-radius: 0.75rem;
  }

  .panel h4 {
    margin-bottom: 0.5rem;
    font-size: 0.92rem;
  }

  .panel__list {
    gap: 0.45rem;
  }

  .panel__row {
    padding: 0.48rem;
    border-radius: 0.5rem;
  }

  .panel__main {
    font-size: 0.82rem;
    line-height: 1.28;
  }

  .panel__sub {
    font-size: 0.72rem;
  }

  .panel__state {
    font-size: 0.78rem;
  }

  .pill {
    font-size: 0.62rem;
    padding: 0.15rem 0.38rem;
  }
}

@media (max-width: 420px) {
  .panel__row {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }
}
</style>
