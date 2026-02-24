import usersData from '../mocks/users.json'
import { httpClient } from '../api/httpClient'
import { endpoints } from '../api/endpoints'
import { useMockApi } from '../config/env'

const MOCK_DELAY_MS = 350

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeUsers(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.users)) return payload.users
  return []
}

export async function getUsers() {
  if (useMockApi) {
    await delay(MOCK_DELAY_MS)
    return { data: { users: normalizeUsers(usersData) } }
  }

  const payload = await httpClient.get(endpoints.users)
  return { data: { users: normalizeUsers(payload) } }
}

export async function loginWithEmail(email, password) {
  const normalizedEmail = email.trim().toLowerCase()

  if (useMockApi) {
    await delay(MOCK_DELAY_MS)
    const users = normalizeUsers(usersData)
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
    )

    if (!matchedUser) {
      throw new Error('Invalid credentials.')
    }

    return {
      token: `local:${matchedUser.email}`,
      user: {
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      },
    }
  }

  const payload = await httpClient.post(endpoints.login, { email, password })
  const data = payload?.data ?? payload
  const token = data?.token

  if (!token) {
    throw new Error('Login response did not include a token.')
  }

  return {
    token,
    user: data?.user ?? null,
  }
}
