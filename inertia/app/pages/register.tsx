import { useState } from 'react'
import { Head, Link } from '@inertiajs/react' // HAPUS useForm
import { User, Mail, Lock, Palette, Briefcase } from 'lucide-react'

export default function Register() {
  const [userType, setUserType] = useState<'client' | 'designer'>('client')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [nomorTelepon, setNomorTelepon] = useState('')
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    passwordConfirmation?: string
    nomorTelepon?: string
    general?: string
  }>({})

  // ✅ Handler functions
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value)
  }

  const handleNomorTeleponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorTelepon(e.target.value)
  }

  // ✅ Submit function
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessing(true)
    setErrors({})
    
    // Validasi password confirmation
    if (password !== passwordConfirmation) {
      setErrors({ passwordConfirmation: 'Password tidak cocok' })
      setProcessing(false)
      return
    }
    
    try {
      // Kirim request ke backend
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullName, // ✅ fullName BUKAN full_name
          email: email,
          password: password,
          nomorTelepon: nomorTelepon || null
        })
      })
      
      if (response.ok) {
        // Register sukses, redirect ke login
        window.location.href = '/login?message=Registration+successful'
      } else {
        const result = await response.json()
        // Handle error dari backend
        if (result.errors) {
          setErrors(result.errors)
        } else if (result.message) {
          setErrors({ general: result.message })
        }
      }
      
    } catch (error) {
      console.error('Register error:', error)
      setErrors({ general: 'Koneksi error. Coba lagi.' })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Head title="Register - DesainHub" />
      
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
            <p className="text-gray-600 mt-2">Bergabung dengan komunitas desainer dan klien kami</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Saya ingin mendaftar sebagai:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  userType === 'client'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Briefcase className={`h-6 w-6 mb-2 ${
                    userType === 'client' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    userType === 'client' ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    Klien
                  </span>
                  <span className="text-xs text-gray-500 mt-1">Mencari jasa desain</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('designer')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  userType === 'designer'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Palette className={`h-6 w-6 mb-2 ${
                    userType === 'designer' ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    userType === 'designer' ? 'text-purple-600' : 'text-gray-700'
                  }`}>
                    Desainer
                  </span>
                  <span className="text-xs text-gray-500 mt-1">Menawarkan jasa desain</span>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message Global */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={handleFullNameChange}
                  required
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon (Opsional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="081234567890"
                  value={nomorTelepon}
                  onChange={handleNomorTeleponChange}
                />
              </div>
              {errors.nomorTelepon && (
                <p className="mt-1 text-sm text-red-600">{errors.nomorTelepon}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ulangi password"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  required
                />
              </div>
              {errors.passwordConfirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.passwordConfirmation}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6"
            >
              {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}