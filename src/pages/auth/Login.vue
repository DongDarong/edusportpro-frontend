<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'
import { getUsers, loginWithEmail } from '../../services/userService'
import hopeLogo from '../../assets/images/logo.jpg'
import { useLanguage } from '../../composables/useLanguage'

const router = useRouter()
const { state, setToken } = useAuthStore()
const { language, setLanguage, t } = useLanguage()
const loading = ref(false)
const usersList = ref([])
const alert = reactive({
  error: '',
  success: '',
})

const form = reactive({
  email: '',
  password: '',
})

const demoUsers = computed(() => usersList.value.filter((user) => user?.email && user?.password))
const canSubmit = computed(() => form.email.trim().length > 0 && form.password.trim().length > 0)
const selectedLanguage = computed({
  get: () => language.value,
  set: (value) => setLanguage(value),
})

function dashboardForRole(role) {
  return {
    admin: '/admin/dashboard',
    coach: '/coach/dashboard',
    player: '/player/dashboard',
  }[role] ?? '/login'
}

function useDemoAccount(user) {
  form.email = user.email
  form.password = user.password
  alert.error = ''
  alert.success = t('login.filledDemo', { role: user.role })
}

onMounted(async () => {
  if (state.user?.role) {
    router.replace(dashboardForRole(state.user.role))
    return
  }

  try {
    const { data } = await getUsers()
    usersList.value = data?.users ?? []
  } catch {
    usersList.value = []
  }
})

async function handleSubmit(event) {
  event.preventDefault()
  if (!canSubmit.value) {
    alert.error = t('login.required')
    alert.success = ''
    return
  }

  loading.value = true
  alert.error = ''
  alert.success = ''

  try {
    const { token, user } = await loginWithEmail(form.email, form.password)
    setToken(token, user)

    const destination = dashboardForRole(user?.role)
    alert.success = t('login.loginSuccess', { role: user?.role ?? 'default' })
    setTimeout(() => router.replace(destination), 500)
  } catch (error) {
    alert.error = error instanceof Error ? error.message : t('login.unexpected')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-shell">
      <aside class="auth-hero">
        <img :src="hopeLogo" alt="Hope for Cambodian children" class="auth-hero__logo" />
        <p class="auth-hero__eyebrow">{{ t('login.appName') }}</p>
        <h1>{{ t('login.welcome') }}</h1>
        <p>
          {{ t('login.description') }}
        </p>

        <div class="auth-hero__swatches" aria-hidden="true">
          <span class="swatch swatch--lime"></span>
          <span class="swatch swatch--cyan"></span>
          <span class="swatch swatch--red"></span>
          <span class="swatch swatch--yellow"></span>
        </div>

        <label class="auth-hero__language">
          <span>{{ t('common.language') }}</span>
          <select v-model="selectedLanguage">
            <option value="KH">{{ t('common.khmer') }}</option>
            <option value="EN">{{ t('common.english') }}</option>
          </select>
        </label>
      </aside>

      <section class="auth-card" aria-label="Login form">
        <form class="auth-form" @submit="handleSubmit" novalidate>
          <label>
            <span>{{ t('login.email') }}</span>
            <input
              v-model="form.email"
              type="email"
              required
              autocomplete="username"
              placeholder="you@example.com"
              :disabled="loading"
            />
          </label>

          <label>
            <span>{{ t('login.password') }}</span>
            <input
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="********"
              :disabled="loading"
            />
          </label>

          <button type="submit" class="primary" :disabled="!canSubmit || loading">
            <span v-if="loading">{{ t('login.checking') }}</span>
            <span v-else>{{ t('login.signIn') }}</span>
          </button>

          <div class="demo" v-if="demoUsers.length">
            <p class="demo__title">{{ t('login.demoAccounts') }}</p>
            <div class="demo__list">
              <button
                v-for="user in demoUsers"
                :key="user.email"
                type="button"
                class="demo__item"
                @click="useDemoAccount(user)"
                :disabled="loading"
              >
                <strong>{{ user.role }}</strong>
                <span>{{ user.email }}</span>
              </button>
            </div>
          </div>

          <p class="note">{{ t('login.sourceNote') }}</p>

          <p v-if="alert.error" class="alert error">{{ alert.error }}</p>
          <p v-if="alert.success" class="alert success">{{ alert.success }}</p>
        </form>
      </section>
    </section>
  </main>
</template>

<style scoped>
:global(body) {
  font-family: 'Space Grotesk', system-ui, sans-serif;
}

.auth-page {
  min-height: 100vh;
  padding: 1.5rem;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 15% 18%, color-mix(in srgb, var(--hope-cyan) 14%, transparent) 0 26%, transparent 26%),
    radial-gradient(circle at 85% 82%, color-mix(in srgb, var(--hope-lime) 15%, transparent) 0 20%, transparent 20%),
    var(--hope-light);
}

.auth-shell {
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  border-radius: 1.2rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--hope-dark) 14%, transparent);
  box-shadow: 0 24px 48px rgba(29, 29, 27, 0.12);
  background: #fff;
}

.auth-hero {
  padding: 2rem;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--hope-cyan) 14%, white), color-mix(in srgb, var(--hope-light) 70%, white));
  border-right: 1px solid color-mix(in srgb, var(--hope-dark) 8%, transparent);
  display: grid;
  align-content: start;
  gap: 0.9rem;
}

.auth-hero__logo {
  width: 170px;
  max-width: 80%;
  height: auto;
  border-radius: 0.45rem;
  background: #fff;
  padding: 0.25rem;
  border: 1px solid color-mix(in srgb, var(--hope-dark) 10%, transparent);
}

.auth-hero__eyebrow {
  margin: 0;
  color: var(--hope-red);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
}

.auth-hero h1 {
  margin: 0;
  color: var(--hope-dark);
  font-size: clamp(1.7rem, 2.6vw, 2.3rem);
  line-height: 1.1;
}

.auth-hero p {
  margin: 0;
  color: color-mix(in srgb, var(--hope-dark) 82%, white);
  line-height: 1.45;
}

.auth-hero__swatches {
  margin-top: 0.7rem;
  display: flex;
  gap: 0.55rem;
}

.auth-hero__language {
  margin-top: 0.6rem;
  display: grid;
  gap: 0.3rem;
  width: min(180px, 100%);
}

.auth-hero__language span {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--hope-dark) 75%, white);
}

.auth-hero__language select {
  border: 1px solid color-mix(in srgb, var(--hope-dark) 18%, transparent);
  border-radius: 0.62rem;
  background: #fff;
  color: var(--hope-dark);
  padding: 0.46rem 0.55rem;
}

.swatch {
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.swatch--lime { background: var(--hope-lime); }
.swatch--cyan { background: var(--hope-cyan); }
.swatch--red { background: var(--hope-red); }
.swatch--yellow { background: var(--hope-yellow); }

.auth-card {
  padding: 2rem;
  background: #fff;
}

.auth-form {
  display: grid;
  gap: 0.8rem;
}

label span {
  display: block;
  margin-bottom: 0.28rem;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--hope-dark) 78%, white);
}

input {
  width: 100%;
  padding: 0.78rem 0.88rem;
  border-radius: 0.72rem;
  border: 1px solid color-mix(in srgb, var(--hope-dark) 17%, transparent);
  background: color-mix(in srgb, var(--hope-light) 78%, white);
  color: var(--hope-dark);
  font-size: 0.98rem;
}

input:focus {
  outline: none;
  border-color: var(--hope-cyan);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hope-cyan) 16%, transparent);
}

.primary {
  width: 100%;
  padding: 0.82rem 0.88rem;
  border: 0;
  border-radius: 0.78rem;
  font-size: 0.98rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(120deg, var(--hope-cyan), color-mix(in srgb, var(--hope-cyan) 68%, var(--hope-dark)));
  cursor: pointer;
}

.primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.primary:not(:disabled):hover {
  filter: brightness(1.03);
}

.demo {
  border: 1px dashed color-mix(in srgb, var(--hope-dark) 20%, transparent);
  border-radius: 0.75rem;
  padding: 0.72rem;
  display: grid;
  gap: 0.55rem;
  background: color-mix(in srgb, var(--hope-light) 64%, white);
}

.demo__title {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--hope-dark);
}

.demo__list {
  display: grid;
  gap: 0.42rem;
}

.demo__item {
  border: 1px solid color-mix(in srgb, var(--hope-dark) 16%, transparent);
  border-radius: 0.62rem;
  padding: 0.52rem 0.62rem;
  background: #fff;
  color: var(--hope-dark);
  text-align: left;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
}

.demo__item strong {
  text-transform: uppercase;
  color: var(--hope-cyan);
  font-size: 0.74rem;
  letter-spacing: 0.05em;
}

.demo__item:hover {
  border-color: var(--hope-cyan);
  background: color-mix(in srgb, var(--hope-cyan) 6%, white);
}

.note {
  margin: 0;
  font-size: 0.82rem;
  color: color-mix(in srgb, var(--hope-dark) 72%, white);
}

.alert {
  margin: 0;
  border-radius: 0.62rem;
  padding: 0.58rem 0.72rem;
  font-size: 0.84rem;
}

.alert.error {
  background: color-mix(in srgb, var(--hope-red) 14%, white);
  color: #8e1418;
}

.alert.success {
  background: color-mix(in srgb, var(--hope-lime) 24%, white);
  color: #2f5f1f;
}

@media (max-width: 920px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }

  .auth-hero {
    border-right: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--hope-dark) 8%, transparent);
  }
}

@media (max-width: 520px) {
  .auth-page {
    padding: 0.85rem;
  }

  .auth-hero,
  .auth-card {
    padding: 1.2rem;
  }

  .demo__item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
