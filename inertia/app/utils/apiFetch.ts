// resources/js/utils/apiFetch.ts
import { getToken } from './auth'

export async function apiFetch(url: string, options: any = {}) {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  return response.json()
}
