import dashboardData from '../mocks/adminDashboard.json'
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
    recentActivities: Array.isArray(data.recentActivities) ? data.recentActivities : [],
  }
}

export async function getAdminDashboard() {
  if (useMockApi) {
    await delay(MOCK_DELAY_MS)
    return { data: normalizeDashboard(dashboardData) }
  }

  const payload = await httpClient.get(endpoints.adminDashboard)
  return { data: normalizeDashboard(payload) }
}
