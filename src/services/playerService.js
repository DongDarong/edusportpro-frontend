import dashboardData from '../mocks/playerDashboard.json'
import { httpClient } from '../api/httpClient'
import { endpoints } from '../api/endpoints'
import { useMockApi } from '../config/env'

const MOCK_DELAY_MS = 350

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeDashboard(payload) {
  const data = payload?.data ?? payload ?? {}

  return {
    summaryCards: Array.isArray(data.summaryCards) ? data.summaryCards : [],
    nextActivities: Array.isArray(data.nextActivities) ? data.nextActivities : [],
  }
}

export async function getPlayerDashboard() {
  if (useMockApi) {
    await delay(MOCK_DELAY_MS)
    return { data: normalizeDashboard(dashboardData) }
  }

  const payload = await httpClient.get(endpoints.playerDashboard)
  return { data: normalizeDashboard(payload) }
}
