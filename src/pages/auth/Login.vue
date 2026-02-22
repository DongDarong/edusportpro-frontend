<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'
import usersData from '../../data/users.json'

const router = useRouter()
const { setToken } = useAuthStore()
const loading = ref(false)
const alert = reactive({
  error: '',
  success: '',
})

const form = reactive({
  email: '',
  password: '',
})

const usersList = usersData?.users ?? []
const demoCredentials = usersList[0] ?? { email: '', password: '' }

const canSubmit = computed(() => form.email.trim().length > 0 && form.password.trim().length > 0)

async function handleSubmit(event) {
  event.preventDefault()
  if (!canSubmit.value) {
    alert.error = 'Email and password are required.'
    alert.success = ''
    return
  }

  loading.value = true
  alert.error = ''
  alert.success = ''

  try {
    const normalizedEmail = form.email.trim().toLowerCase()
    const matchedUser = usersList.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === form.password,
    )

    if (!matchedUser) {
      throw new Error('Invalid credentials for the local user dataset.')
    }

    const token = `local:${matchedUser.email}`
    setToken(token, {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    })

    alert.success = 'Login successful (local JSON). Redirecting to the dashboard…'
    setTimeout(() => router.replace('/admin/dashboard'), 700)
  } catch (error) {
    alert.error = error instanceof Error ? error.message : 'Unexpected error during login.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">

      <form class="auth-form" @submit="handleSubmit" novalidate>
        <label>
          <span>Email</span>
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
          <span>Password</span>
          <input
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            :disabled="loading"
          />
        </label>

        <button type="submit" class="primary" :disabled="!canSubmit || loading">
          <span v-if="loading">Checking…</span>
          <span v-else>Sign in</span>
        </button>

        <p class="note">
          Uses the bundled `src/data/users.json` dataset. Matching credentials store a simulated token
          in <code>localStorage</code> to model an authenticated session.
        </p>

        <p v-if="alert.error" class="alert error">{{ alert.error }}</p>
        <p v-if="alert.success" class="alert success">{{ alert.success }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  font-family: 'Space Grotesk', system-ui, sans-serif;
}

.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, #0b1d2e 0%, #102840 60%, #0a1220 100%);
}

.auth-card {
  width: min(460px, 90vw);
  background: #0e1a2a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 20px 45px rgba(3, 8, 20, 0.6);
  color: #e2ecff;
}

.auth-card__header {
  margin-bottom: 1.25rem;
}

.eyebrow {
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #74d0ff;
  margin-bottom: 0.25rem;
}

h1 {
  margin-bottom: 0.25rem;
  font-size: 1.75rem;
  line-height: 1.25;
}

.subhead {
  margin: 0 0 0.75rem;
  color: rgba(226, 236, 255, 0.8);
  font-size: 0.95rem;
}

.demo-credentials {
  display: grid;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.75rem;
  border-radius: 0.8rem;
  font-size: 0.85rem;
}

.demo-credentials .label {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.demo-credentials strong {
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

label span {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(5, 11, 20, 0.65);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: #74d0ff;
  outline: none;
}

button.primary {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.95rem;
  border: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #071229;
  background: linear-gradient(120deg, #74d0ff, #50a8ff);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button.primary:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

button.primary:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(43, 127, 228, 0.35);
}

.note {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
}

.alert {
  padding: 0.6rem 0.8rem;
  border-radius: 0.65rem;
  font-size: 0.85rem;
  margin: 0;
}

.alert.error {
  background: rgba(255, 74, 74, 0.1);
  color: #ff7e7e;
}

.alert.success {
  background: rgba(71, 226, 176, 0.12);
  color: #67d8b2;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
