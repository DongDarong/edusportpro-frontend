<script setup>
defineProps({
  standings: {
    type: Array,
    default: () => [],
  },
})

function goalDifference(value) {
  const number = Number(value ?? 0)
  if (Number.isNaN(number)) return value ?? '0'
  if (number > 0) return `+${number}`
  return `${number}`
}

function rowClass(position) {
  if (Number(position) === 1) return 'standings__row--first'
  if (Number(position) <= 3) return 'standings__row--top'
  return ''
}

function gdClass(value) {
  const number = Number(value ?? 0)
  if (Number.isNaN(number)) return 'standings__gd--neutral'
  if (number > 0) return 'standings__gd--pos'
  if (number < 0) return 'standings__gd--neg'
  return 'standings__gd--neutral'
}
</script>

<template>
  <section class="standings-card">
    <header class="standings-card__head">
      <h3>Standings Preview</h3>
      <p>League table snapshot</p>
    </header>

    <div class="standings-card__table-wrap">
      <table class="standings">
        <thead>
          <tr>
            <th class="py-2">Pos</th>
            <th class="py-2">Team</th>
            <th class="py-2">P</th>
            <th class="py-2">W</th>
            <th class="py-2">D</th>
            <th class="py-2">L</th>
            <th class="py-2">GF</th>
            <th class="py-2">GA</th>
            <th class="py-2">GD</th>
            <th class="py-2 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in standings"
            :key="team.id || team.position || team.name"
            class="standings__row"
            :class="rowClass(team.position)"
          >
            <td class="standings__pos">{{ team.position }}</td>
            <td class="standings__team">{{ team.name }}</td>
            <td>{{ team.played }}</td>
            <td>{{ team.wins }}</td>
            <td>{{ team.draws }}</td>
            <td>{{ team.losses }}</td>
            <td>{{ team.goalsFor }}</td>
            <td>{{ team.goalsAgainst }}</td>
            <td :class="gdClass(team.goalDifference)">{{ goalDifference(team.goalDifference) }}</td>
            <td class="standings__points">{{ team.points }}</td>
          </tr>
          <tr v-if="!standings.length">
            <td colspan="10" class="standings__empty">No standings available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.standings-card {
  border: 1px solid #e6edf3;
  border-radius: 0.95rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fcff 100%);
  box-shadow: 0 10px 28px rgba(2, 51, 78, 0.06);
  padding: 1rem;
}

.standings-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.standings-card__head h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--hope-dark);
}

.standings-card__head p {
  margin: 0;
  font-size: 0.75rem;
  color: #5a6e7e;
}

.standings-card__table-wrap {
  overflow-x: auto;
}

.standings {
  min-width: 640px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.82rem;
}

.standings thead th {
  text-align: left;
  font-size: 0.69rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #657c8d;
  border-bottom: 1px solid #d9e5ef;
  padding: 0.5rem 0.42rem;
}

.standings thead th:last-child {
  text-align: right;
}

.standings__row td {
  padding: 0.52rem 0.42rem;
  border-bottom: 1px solid #edf2f7;
  color: #4f6678;
}

.standings__row--top {
  background: #fcfeff;
}

.standings__row--first {
  background: #f4fbff;
}

.standings__pos {
  font-weight: 700;
  color: #1f3f53;
}

.standings__team {
  font-weight: 700;
  color: var(--hope-dark);
}

.standings__gd--pos {
  color: #2b7f24;
  font-weight: 700;
}

.standings__gd--neg {
  color: #a8212d;
  font-weight: 700;
}

.standings__gd--neutral {
  color: #5c7282;
  font-weight: 700;
}

.standings__points {
  text-align: right;
  font-weight: 800;
  color: #2a7420;
}

.standings__empty {
  padding: 0.8rem;
  font-size: 0.84rem;
  color: #667c8c;
  text-align: center;
}

@media (max-width: 640px) {
  .standings-card {
    padding: 0.82rem;
    border-radius: 0.85rem;
  }

  .standings-card__head {
    margin-bottom: 0.6rem;
  }

  .standings-card__head h3 {
    font-size: 0.9rem;
  }

  .standings-card__head p {
    font-size: 0.67rem;
  }

  .standings {
    min-width: 520px;
    font-size: 0.76rem;
  }

  .standings thead th {
    font-size: 0.62rem;
    padding: 0.42rem 0.35rem;
  }

  .standings__row td {
    padding: 0.45rem 0.35rem;
  }
}

@media (max-width: 420px) {
  .standings {
    min-width: 460px;
  }

  .standings thead th:nth-child(7),
  .standings thead th:nth-child(8),
  .standings__row td:nth-child(7),
  .standings__row td:nth-child(8) {
    display: none;
  }
}

@media (max-width: 480px) {
  .standings-card {
    padding: 0.7rem;
  }

  .standings-card__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .standings {
    min-width: 430px;
    font-size: 0.72rem;
  }

  .standings thead th:nth-child(5),
  .standings__row td:nth-child(5) {
    display: none;
  }
}
</style>

