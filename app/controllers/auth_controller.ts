// app/controllers/auth_controller.ts
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

interface UserSession {
  id: number
  email: string
  fullName: string
  nomorTelepon?: string | null
}

export default class AuthController {
  // Register Page
  async registerPage({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  // Login Page
  async loginPage({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  // Register Action
  async register({ request, response, session }: HttpContext) {
    const data = request.only([
      'full_name',
      'email',
      'password',
      'password_confirmation',
      'nomor_telepon'
    ])

    console.log('Registration data:', data)

    // Validasi
    const errors: any = {}
    
    if (!data.full_name?.trim()) {
      errors.full_name = 'Nama lengkap diperlukan'
    }

    if (!data.email?.includes('@')) {
      errors.email = 'Email tidak valid'
    }

    // Cek email duplikat
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      errors.email = 'Email sudah terdaftar'
    }

    if (!data.password || data.password.length < 6) {
      errors.password = 'Password minimal 6 karakter'
    }

    if (data.password !== data.password_confirmation) {
      errors.password = 'Password tidak cocok'
    }

    if (Object.keys(errors).length > 0) {
      session.flash('errors', errors)
      return response.redirect().back()
    }

    try {
      // Buat user
      const user = await User.create({
        fullName: data.full_name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password, // Akan di-hash otomatis oleh model
        nomorTelepon: data.nomor_telepon || null,
        emailVerifiedAt: DateTime.now()
      })

      // Simpan user di session
      const userSession: UserSession = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        nomorTelepon: user.nomorTelepon
      }
      
      session.put('user', userSession)

      session.flash('success', 'Registrasi berhasil!')
      return response.redirect('/dashboard')
      
    } catch (error: any) {
      console.error('Registration error:', error.message)
      session.flash('errors', { 
        general: 'Terjadi kesalahan saat registrasi' 
      })
      return response.redirect().back()
    }
  }

  // Login Action
  async login({ request, response, session }: HttpContext) {
    const { email, password, remember } = request.only([
      'email',
      'password',
      'remember'
    ])

    try {
      // Cari user
      const user = await User.findBy('email', email)
      
      if (!user) {
        session.flash('errors', { email: 'Email tidak terdaftar' })
        return response.redirect().back()
      }

      // Verifikasi password
      const isValidPassword = await hash.verify(user.password, password)
      
      if (!isValidPassword) {
        session.flash('errors', { password: 'Password salah' })
        return response.redirect().back()
      }

      // Simpan user di session
      const userSession: UserSession = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        nomorTelepon: user.nomorTelepon
      }
      
      session.put('user', userSession)

      if (remember) {
        session.put('remember', true)
      }

      session.flash('success', 'Login berhasil!')
      return response.redirect('/dashboard')
      
    } catch (error: any) {
      console.error('Login error:', error.message)
      session.flash('errors', { 
        general: 'Terjadi kesalahan saat login' 
      })
      return response.redirect().back()
    }
  }

  // Logout
  async logout({ response, session }: HttpContext) {
    session.forget('user')
    session.forget('remember')
    session.flash('success', 'Logout berhasil!')
    return response.redirect('/login')
  }

  // Dashboard
  async dashboard({ inertia, session, response }: HttpContext) {
    const user = session.get('user')
    
    if (!user) {
      return response.redirect('/login')
    }
    
    return inertia.render('dashboard', { user })
  }
}