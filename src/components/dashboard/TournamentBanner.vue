<template>
  <header class="banner">
    <div>
      <p class="banner__eyebrow">Tournament Banner</p>
      <h3 class="banner__title">HOPE Community Cup</h3>
      <p class="banner__subtitle">Live status, quick schedule, and activity stream.</p>
    </div>
    <button type="button" class="banner__cta">View Tournament</button>
  </header>
</template>

<style scoped>
.banner {
  border-radius: 0.9rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  color: #fff;
  background: linear-gradient(120deg, var(--hope-cyan), var(--hope-lime));
}

.banner__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.9;
}

.banner__title {
  margin: 0.2rem 0;
  font-size: 1.25rem;
}

.banner__subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.banner__cta {
  border: 0;
  border-radius: 0.6rem;
  padding: 0.55rem 0.8rem;
  background: #fff;
  color: var(--hope-cyan);
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 640px) {
  .banner {
    padding: 0.82rem;
    border-radius: 0.8rem;
    align-items: flex-start;
    gap: 0.7rem;
  }

  .banner__eyebrow {
    font-size: 0.66rem;
    letter-spacing: 0.1em;
  }

  .banner__title {
    margin: 0.16rem 0;
    font-size: 1.05rem;
  }

  .banner__subtitle {
    font-size: 0.8rem;
  }

  .banner__cta {
    padding: 0.45rem 0.68rem;
    font-size: 0.78rem;
  }
}

@media (max-width: 420px) {
  .banner {
    padding: 0.72rem;
    gap: 0.62rem;
    flex-direction: column;
    align-items: stretch;
  }

  .banner__eyebrow {
    font-size: 0.62rem;
  }

  .banner__title {
    font-size: 0.94rem;
  }

  .banner__subtitle {
    font-size: 0.74rem;
  }

  .banner__cta {
    width: 100%;
    padding: 0.44rem 0.62rem;
    border-radius: 0.52rem;
    font-size: 0.74rem;
  }
}
</style>
