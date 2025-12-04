// inertia/app/utils/auth.ts
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

export const auth = {
  // Get token dari localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },
  
  // Cek token expired
  isTokenExpired(): boolean {
    const expires = localStorage.getItem('token_expires')
    if (!expires) return false
    
    const expiryDate = new Date(expires)
    const now = new Date()
    return now > expiryDate
  },
  
  // Cek jika user sudah login
  isLoggedIn(): boolean {
    const token = this.getToken()
    return !!token && !this.isTokenExpired()
  },
  
  // Logout
  logout(): void {
    const token = this.getToken()
    
    // Kirim request logout ke backend
    if (token) {
      fetch('/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).catch(() => {
        // Ignore errors saat logout
      })
    }
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('token_expires')
    localStorage.removeItem('token_type')
    
    // Redirect ke login
    window.location.href = '/login'
  },
  
  // Fetch dengan token
  async fetchWithAuth(url: string, options: FetchOptions = {}) {
    const token = this.getToken()
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    })
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      this.logout()
      throw new Error('Unauthorized')
    }
    
    return response
  }
}