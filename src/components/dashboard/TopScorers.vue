<script setup>
defineProps({
  scorers: {
    type: Array,
    default: () => [],
  },
})

function rankClass(rank) {
  if (rank === 1) return 'scorer__rank--first'
  if (rank === 2) return 'scorer__rank--second'
  if (rank === 3) return 'scorer__rank--third'
  return 'scorer__rank--default'
}
</script>

<template>
  <section class="scorer-card">
    <header class="scorer-card__head">
      <h3>Top Scorers</h3>
      <p>Current golden boot race</p>
    </header>

    <ul class="scorer-card__list">
      <li
        v-for="(player, index) in scorers"
        :key="player.id || `${player.name}-${index}`"
        class="scorer"
      >
        <div class="scorer__main">
          <span class="scorer__rank" :class="rankClass(index + 1)">
            {{ index + 1 }}
          </span>
          <div>
            <p class="scorer__name">{{ player.name }}</p>
            <p class="scorer__team">{{ player.team }}</p>
          </div>
        </div>
        <p class="scorer__goals">{{ player.goals }} goals</p>
      </li>
      <li v-if="!scorers.length" class="scorer-card__empty">No scorer data available.</li>
    </ul>
  </section>
</template>

<style scoped>
.scorer-card {
  border: 1px solid #e6edf3;
  border-radius: 0.95rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fcff 100%);
  box-shadow: 0 10px 30px rgba(2, 51, 78, 0.06);
  padding: 1rem;
}

.scorer-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.scorer-card__head h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--hope-dark);
}

.scorer-card__head p {
  margin: 0;
  font-size: 0.75rem;
  color: #5a6e7e;
}

.scorer-card__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.scorer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid #e7edf3;
  border-radius: 0.75rem;
  padding: 0.6rem 0.65rem;
  background: #fff;
}

.scorer__main {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.scorer__rank {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
}

.scorer__rank--first { background: #ffe8a2; color: #7a5a00; }
.scorer__rank--second { background: #dce6f0; color: #3f5263; }
.scorer__rank--third { background: #ffdccc; color: #84452a; }
.scorer__rank--default { background: #eef3f7; color: #4d6070; }

.scorer__name {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--hope-dark);
}

.scorer__team {
  margin: 0.1rem 0 0;
  font-size: 0.72rem;
  color: #637887;
}

.scorer__goals {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 800;
  color: #2a7420;
}

.scorer-card__empty {
  font-size: 0.84rem;
  color: #667c8c;
  border: 1px dashed #d5e1eb;
  border-radius: 0.7rem;
  padding: 0.75rem;
  text-align: center;
}

@media (max-width: 640px) {
  .scorer-card {
    padding: 0.82rem;
    border-radius: 0.85rem;
  }

  .scorer-card__head {
    margin-bottom: 0.65rem;
  }

  .scorer-card__head h3 {
    font-size: 0.9rem;
  }

  .scorer-card__head p {
    font-size: 0.67rem;
  }

  .scorer {
    padding: 0.52rem 0.55rem;
  }

  .scorer__rank {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.66rem;
  }

  .scorer__name {
    font-size: 0.8rem;
  }

  .scorer__team {
    font-size: 0.68rem;
  }

  .scorer__goals {
    font-size: 0.74rem;
  }
}

@media (max-width: 420px) {
  .scorer-card {
    padding: 0.72rem;
    border-radius: 0.78rem;
  }

  .scorer-card__head h3 {
    font-size: 0.84rem;
  }

  .scorer-card__head p {
    font-size: 0.62rem;
  }

  .scorer {
    padding: 0.45rem 0.48rem;
    border-radius: 0.68rem;
  }

  .scorer__main {
    gap: 0.45rem;
  }

  .scorer__rank {
    width: 1.35rem;
    height: 1.35rem;
    font-size: 0.62rem;
  }

  .scorer__name {
    font-size: 0.74rem;
  }

  .scorer__team {
    font-size: 0.64rem;
  }

  .scorer__goals {
    font-size: 0.68rem;
  }

  .scorer-card__empty {
    font-size: 0.76rem;
    padding: 0.62rem;
  }
}
</style>
