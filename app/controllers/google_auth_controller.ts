// app/controllers/google_auth_controller.ts
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { GoogleAuthService } from '#services/google_auth'
import { DateTime } from 'luxon'

export default class GoogleAuthController {
  private googleAuth: GoogleAuthService

  constructor() {
    this.googleAuth = new GoogleAuthService()
  }

  async redirect({ response }: HttpContext) {
    try {
      const authUrl = this.googleAuth.generateAuthUrl()
      return response.redirect(authUrl)
    } catch (error) {
      console.error('Error generating Google auth URL:', error)
      return response.redirect('/login?error=google_auth_failed')
    }
  }

  async callback({ request, auth, response, session }: HttpContext) {
    try {
      const code = request.input('code')
      const error = request.input('error')
      
      if (error) {
        session.flash('errors', { google: `Google auth error: ${error}` })
        return response.redirect('/login')
      }
      
      if (!code) {
        session.flash('errors', { google: 'Authorization code not found' })
        return response.redirect('/login')
      }

      // Get tokens
      const tokens = await this.googleAuth.getToken(code)
      
      if (!tokens.id_token) {
        throw new Error('No ID token received from Google')
      }
      
      // Get user info
      const googleUser = await this.googleAuth.getUserInfo(tokens.id_token)
      
      // Validasi data
      if (!googleUser.email) {
        throw new Error('Email not provided by Google')
      }
      
      if (!googleUser.id) {
        throw new Error('User ID not provided by Google')
      }
      
      // Cari atau buat user
      let user = await User.findBy('email', googleUser.email)

      if (!user) {
        user = await User.create({
          fullName: googleUser.name || 'Google User',
          email: googleUser.email,
          password: Math.random().toString(36).slice(-10),
          avatarUrl: googleUser.picture,
          provider: 'google',
          providerId: googleUser.id,
          emailVerifiedAt: googleUser.emailVerified ? DateTime.now() : null,
        })
      } else {
        user.avatarUrl = googleUser.picture
        user.provider = 'google'
        user.providerId = googleUser.id
        await user.save()
      }

      // 👇 PERBAIKAN: Login dengan type assertion atau validasi
      if (auth && typeof auth.use === 'function') {
        // @ts-ignore - bypass type checking sementara
        await auth.use('web').login(user)
      } else {
        // Manual session login jika auth tidak tersedia
        // @ts-ignore
        session.put('user', {
          id: user.id,
          email: user.email,
          name: user.fullName,
          avatarUrl: user.avatarUrl
        })
      }

      session.flash('success', 'Login dengan Google berhasil!')
      return response.redirect('/dashboard')

    } catch (error) {
      console.error('Google auth error:', error)
      session.flash('errors', { 
        google: 'Terjadi kesalahan saat login dengan Google' 
      })
      return response.redirect('/login')
    }
  }
}