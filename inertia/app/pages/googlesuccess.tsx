// resources/js/Pages/Auth/GoogleSuccess.tsx
import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

// Define interface untuk user
interface GoogleUser {
  id: number
  fullName: string
  email: string
  nomorTelepon?: string
  avatarUrl?: string
}

export default function GoogleSuccess() {
  const { props } = usePage<{
    token?: string
    user?: GoogleUser
  }>()
  
  const { token, user } = props
  
  useEffect(() => {
    if (token && user) {
      // 1. Simpan ke localStorage
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      console.log('✅ Token disimpan:', token.substring(0, 20) + '...')
      console.log('✅ User:', user.fullName)
      
      // 2. Setup fetch interceptor otomatis
      const originalFetch = window.fetch
      window.fetch = async function(url, options = {}) {
        if (typeof url === 'string' && url.startsWith('/')) {
          const token = localStorage.getItem('auth_token')
          if (token) {
            const headers = new Headers(options.headers || {})
            headers.set('Authorization', `Bearer ${token}`)
            return originalFetch(url, { ...options, headers })
          }
        }
        return originalFetch(url, options)
      }
      
      console.log('✅ Auth interceptor diaktifkan')
      
      // 3. Redirect setelah 1 detik
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
      
    } else {
      console.error('❌ Tidak ada token atau user dari server')
      // Jika tidak ada token, redirect ke login
      window.location.href = '/login?error=no_token'
    }
  }, [token, user])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login Berhasil!</h1>
        
        {user && (
          <div className="mb-6">
            <div className="flex items-center justify-center mb-3">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full mr-3"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">
                    {user.fullName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900">{user.fullName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Menyiapkan sesi Anda...</p>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Anda akan dialihkan otomatis dalam 3 detik
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Lanjutkan ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}