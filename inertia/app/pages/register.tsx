import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { User, Mail, Lock, Palette, Briefcase } from 'lucide-react'

// ✅ Interface untuk Register
interface RegisterFormData {
  full_name: string      // ✅ Sesuai migration: 'full_name' bukan 'name'
  email: string
  password: string
  password_confirmation: string
  nomor_telepon?: string // ✅ Ubah jadi string (opsional)
}

export default function Register() {
  const [userType, setUserType] = useState<'client' | 'designer'>('client')
  
  // ✅ Gunakan type yang sesuai dengan migration
  const { data, setData, post, processing, errors } = useForm<RegisterFormData>({
    full_name: '',      // ✅ Sesuai kolom di database
    email: '',
    password: '',
    password_confirmation: '',
    nomor_telepon: '',  // ✅ Sesuai kolom di database
  })

  // ✅ Fix type error
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/register')
  }

  // ✅ Handler dengan type yang benar
  const handleInputChange = (field: keyof RegisterFormData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData(field, e.target.value)
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Head title="Register - DesainHub" />
      
      <div className="w-full max-w-2xl">
        {/* ... (kode UI tetap sama) ... */}
        
        <form onSubmit={submit} className="space-y-4">
          {/* Full Name - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                value={data.full_name}  // ✅ Sesuai interface
                onChange={handleInputChange('full_name')}  // ✅ Pakai handler
                required
              />
            </div>
            {errors.full_name && (  // ✅ Sesuai field name
              <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
            )}
          </div>

          {/* Email - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={data.email}
                onChange={handleInputChange('email')}
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone Number - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="081234567890"
                value={data.nomor_telepon || ''}
                onChange={handleInputChange('nomor_telepon')}
              />
            </div>
          </div>

          {/* Password - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a strong password"
                value={data.password}
                onChange={handleInputChange('password')}
                required
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password - FIXED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                value={data.password_confirmation}
                onChange={handleInputChange('password_confirmation')}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6"
          >
            {processing ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}