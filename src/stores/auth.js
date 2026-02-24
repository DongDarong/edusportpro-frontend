import { reactive, computed } from 'vue'

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

const state = reactive({
  token: '',
  user: null,
})

function readLocalAuth() {
  if (typeof window === 'undefined') return

  const token = window.localStorage.getItem(TOKEN_KEY)
  const userRaw = window.localStorage.getItem(USER_KEY)

  if (token) {
    state.token = token
  }

  if (userRaw) {
    try {
      state.user = JSON.parse(userRaw)
    } catch {
      state.user = null
      window.localStorage.removeItem(USER_KEY)
    }
  }
}

readLocalAuth()

const isAuthenticated = computed(() => Boolean(state.token))

function setToken(token, user = null) {
  state.token = token
  state.user = user

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TOKEN_KEY, token)
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(USER_KEY)
    }
  }
}

function clearAuth() {
  state.token = ''
  state.user = null

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
  }
}

export function useAuthStore() {
  return {
    state,
    isAuthenticated,
    setToken,
    clearAuth,
  }
}
