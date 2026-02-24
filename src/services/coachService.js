import dashboardData from '../mocks/coachDashboard.json'
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
    upcomingSessions: Array.isArray(data.upcomingSessions) ? data.upcomingSessions : [],
  }
}

export async function getCoachDashboard() {
  if (useMockApi) {
    await delay(MOCK_DELAY_MS)
    return { data: normalizeDashboard(dashboardData) }
  }

  const payload = await httpClient.get(endpoints.coachDashboard)
  return { data: normalizeDashboard(payload) }
}
