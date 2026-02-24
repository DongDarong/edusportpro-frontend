const trueValues = new Set(['1', 'true', 'yes', 'on'])

function toBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback
  }
  return trueValues.has(String(value).trim().toLowerCase())
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'
export const useMockApi = toBoolean(import.meta.env.VITE_USE_MOCK_API, true)
