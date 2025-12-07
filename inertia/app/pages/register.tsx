import { useState, useEffect } from 'react' // ✅ Tambahkan useEffect
import { Head, Link } from '@inertiajs/react'
import { User, Mail, Lock, Palette, Briefcase, AlertCircle, CheckCircle } from 'lucide-react'

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

  // ✅ State untuk real-time validation feedback
  const [fullNameError, setFullNameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [fullNameTouched, setFullNameTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  // ✅ Handler functions
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFullName(value)
    setFullNameTouched(true)
    
    // Real-time validation
    if (value.trim().length < 6) {
      setFullNameError('Nama minimal 6 karakter')
    } else {
      setFullNameError('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setPasswordTouched(true)
    
    // Real-time validation
    if (value.length < 6) {
      setPasswordError('Password minimal 6 karakter')
    } else {
      setPasswordError('')
    }
  }

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value)
  }

  const handleNomorTeleponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorTelepon(e.target.value)
  }

  // ✅ Validasi sebelum submit
  const validateForm = (): boolean => {
    const newErrors: any = {}
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi'
    } else if (fullName.trim().length < 6) {
      newErrors.fullName = 'Nama minimal 6 karakter'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email tidak valid'
    }
    
    if (!password) {
      newErrors.password = 'Password wajib diisi'
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }
    
    if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = 'Password tidak cocok'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ Submit function
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessing(true)
    
    // Validasi form sebelum submit
    if (!validateForm()) {
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
          fullName: fullName.trim(), // ✅ Pastikan trim sebelum dikirim
          email: email.trim(),
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

  // ✅ Cek apakah form valid
  const isFormValid = 
    fullName.trim().length >= 6 &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 6 &&
    password === passwordConfirmation

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
            
            {/* Info persyaratan */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>Nama lengkap minimal 6 karakter</span>
              </div>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Saya ingin mendaftar sebagai:</p>
            <div className="flex">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Briefcase className="h-6 w-6 mb-2 text-blue-600" />
                  <span className="font-medium text-blue-600">
                    Klien
                  </span>
                  <span className="text-xs text-gray-500 mt-1">Mencari jasa desain</span>
                </div>
              </button>
            </div>
            <input type="hidden" name="user_type" value="client" />
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className={`mr-1 ${fullName.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                    {fullName.length}/6
                  </span>
                  {fullName.length >= 6 ? (
                    <CheckCircle className="w-3 h-3 text-green-600 ml-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-gray-400 ml-1" />
                  )}
                </div>
              </div>
              
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    fullNameError || errors.fullName
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : fullName.length >= 6
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="John Doe (minimal 6 karakter)"
                  value={fullName}
                  onChange={handleFullNameChange}
                  onBlur={() => setFullNameTouched(true)}
                  required
                />
              </div>
              
              {/* Helper text */}
              {!fullNameError && !errors.fullName && fullName.length > 0 && fullName.length < 6 && (
                <div className="mt-1 flex items-center text-amber-600 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Tambahkan {6 - fullName.length} karakter lagi
                </div>
              )}
              
              {/* Error messages */}
              {fullNameError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {fullNameError}
                </p>
              )}
              {errors.fullName && !fullNameError && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
              
              {/* Info tambahan */}
              {!fullNameError && !errors.fullName && fullName.length >= 6 && (
                <div className="mt-1 flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Nama sudah memenuhi syarat
                </div>
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
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className={`mr-1 ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                    {password.length}/6
                  </span>
                  {password.length >= 6 ? (
                    <CheckCircle className="w-3 h-3 text-green-600 ml-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-gray-400 ml-1" />
                  )}
                </div>
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError || errors.password
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : password.length >= 6
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordTouched(true)}
                  required
                  minLength={6}
                />
              </div>
              
              {/* Helper text */}
              {!passwordError && !errors.password && password.length > 0 && password.length < 6 && (
                <div className="mt-1 flex items-center text-amber-600 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Tambahkan {6 - password.length} karakter lagi
                </div>
              )}
              
              {/* Error messages */}
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {passwordError}
                </p>
              )}
              {errors.password && !passwordError && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              
              {/* Info tambahan */}
              {!passwordError && !errors.password && password.length >= 6 && (
                <div className="mt-1 flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Password sudah memenuhi syarat
                </div>
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
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.passwordConfirmation
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : passwordConfirmation && password === passwordConfirmation
                      ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Ulangi password"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  required
                />
              </div>
              
              {passwordConfirmation && password !== passwordConfirmation && (
                <div className="mt-1 flex items-center text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Password tidak cocok
                </div>
              )}
              
              {passwordConfirmation && password === passwordConfirmation && (
                <div className="mt-1 flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Password cocok
                </div>
              )}
              
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
              disabled={processing || !isFormValid}
              className={`w-full bg-gradient-to-r text-white py-3 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6 ${
                isFormValid
                  ? 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500'
                  : 'from-gray-400 to-gray-500 cursor-not-allowed'
              }`}
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