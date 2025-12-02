import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Mail, Lock, Eye, EyeOff, Palette, ArrowRight } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  
  const { data, setData, post, processing, errors } = useForm<LoginFormData>({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('email', e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('password', e.target.value)
  }

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('remember', e.target.checked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Head title="Login - DesainHub" />
      
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Branding & Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Desain Aja Dulu</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Platform jasa desain terpercaya untuk proyek kreatif Anda
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Temukan desainer profesional</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Portofolio beragam kategori</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <span className="text-gray-700">Pembayaran aman & terjamin</span>
              </div>
            </div>

            {/* Register CTA */}
            <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Belum punya akun?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Bergabung dengan ribuan desainer dan klien di platform kami
              </p>
              <Link
                href="/register"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium group"
              >
                Daftar Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Masuk ke Akun Anda</h2>
              <p className="text-gray-600 mt-2">Selamat datang kembali!</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="nama@email.com"
                    value={data.email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan password"
                    value={data.password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={data.remember}
                    onChange={handleRememberChange}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Ingat saya
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {processing ? 'Memproses...' : 'Masuk'}
              </button>

              {/* Demo Credentials */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  🎯 Akun Demo (Testing):
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-blue-700">designer@example.com</p>
                  </div>
                  <div>
                    <span className="font-medium">Password:</span>
                    <p className="text-blue-700">password</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Atau</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Belum punya akun?{' '}
                  <Link
                    href="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Daftar di sini
                  </Link>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Gratis bergabung. Tidak ada biaya pendaftaran.
                </p>
              </div>
            </form>

            {/* Social Login (Optional) */}
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600 mb-3">
                Masuk dengan
              </p>
              <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.location.href = '/auth/google'} // 👈 TAMBAHKAN INI
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} DesainHub. Tugas Akhir Pengembangan API.
            <Link href="/terms" className="mx-2 text-blue-600 hover:underline">
              Syarat & Ketentuan
            </Link>
            •
            <Link href="/privacy" className="mx-2 text-blue-600 hover:underline">
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}