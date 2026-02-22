import { reactive, computed } from 'vue'

const state = reactive({
  token: '',
  user: null,
})

function readLocalToken() {
  if (typeof window === 'undefined') return
  const token = window.localStorage.getItem('authToken')
  if (token) {
    state.token = token
  }
}

readLocalToken()

const isAuthenticated = computed(() => Boolean(state.token))

function setToken(token, user = null) {
  state.token = token
  state.user = user
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('authToken', token)
  }
}

function clearAuth() {
  state.token = ''
  state.user = null
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('authToken')
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
