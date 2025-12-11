// resources/js/utils/auth.ts

export function getToken() {
  return localStorage.getItem('auth_token')
}

export function getUser() {
  const user = localStorage.getItem('auth_user')
  return user ? JSON.parse(user) : null
}

export function clearAuth() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
}
