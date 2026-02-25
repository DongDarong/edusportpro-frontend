<script setup>
const todayMatches = [
  { id: 1, matchup: 'Team E vs Team F', time: '3:00 PM' },
  { id: 2, matchup: 'Team G vs Team H', time: '5:30 PM' },
  { id: 3, matchup: 'Team I vs Team J', time: '7:00 PM' },
]
</script>

<template>
  <article class="panel">
    <h4>Today Matches</h4>
    <ul class="panel__list">
      <li v-for="match in todayMatches" :key="match.id" class="panel__row">
        <p class="panel__main">{{ match.matchup }}</p>
        <p class="panel__sub">{{ match.time }}</p>
      </li>
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
  margin: 0;
  font-size: 0.8rem;
  color: color-mix(in srgb, var(--hope-dark) 62%, white);
}

@media (max-width: 640px) {
  .panel {
    padding: 0.78rem;
    border-radius: 0.78rem;
  }

  .panel h4 {
    margin-bottom: 0.58rem;
    font-size: 0.92rem;
  }

  .panel__list {
    gap: 0.48rem;
  }

  .panel__row {
    padding: 0.48rem 0.5rem;
    gap: 0.55rem;
  }

  .panel__main {
    font-size: 0.8rem;
  }

  .panel__sub {
    font-size: 0.72rem;
  }
}

@media (max-width: 420px) {
  .panel {
    padding: 0.68rem;
  }

  .panel h4 {
    margin-bottom: 0.52rem;
    font-size: 0.86rem;
  }

  .panel__row {
    padding: 0.42rem 0.45rem;
    border-radius: 0.52rem;
  }

  .panel__main {
    font-size: 0.74rem;
  }

  .panel__sub {
    font-size: 0.68rem;
  }
}
</style>
