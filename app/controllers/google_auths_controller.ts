// app/Controllers/Http/GoogleAuthController.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class GoogleAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, response,auth }: HttpContext) {
    try {
      const google = ally.use('google')
      
      // Validasi OAuth state
      if (google.accessDenied()) {
        return response.redirect('/login?error=access_denied')
      }
      
      if (google.stateMisMatch()) {
        return response.redirect('/login?error=state_mismatch')
      }
      
      if (google.hasError()) {
        return response.redirect('/login?error=oauth_error')
      }
      
      // Dapatkan user info dari Google
      const googleUser = await google.user()
      
      // Debug: lihat data yang didapat
      console.log('Google User Data:', {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.avatarUrl,
        emailVerified: googleUser.emailVerificationState
      })
      
      // Cari user berdasarkan email
      let user = await User.findBy('email', googleUser.email)
      
      if (!user) {
        // Buat user baru
        user = await User.create({
          fullName: googleUser.name,
          email: googleUser.email,
          password: await hash.make(Math.random().toString(36)), // random password
          nomorTelepon: '',
          googleId: googleUser.id,
          avatarUrl: googleUser.avatarUrl
        })
        
        console.log('✅ User baru dibuat:', user.email)
      } else {
        // Update googleId jika belum ada
        if (!user.googleId) {
          user.googleId = googleUser.id
          user.avatarUrl = googleUser.avatarUrl
          await user.save()
        }
        
        console.log('✅ User sudah ada:', user.email)
      }
      
      // Generate access token (sama seperti login biasa)
      const token = await auth.use('api').createToken(user)
      
      // Redirect ke frontend dengan token di query parameter
      return response.redirect(`/auth/google/success?token=${token.value}&user=${encodeURIComponent(JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        nomorTelepon: user.nomorTelepon,
        avatarUrl: user.avatarUrl
      }))}`)
      
    } catch (error) {
      console.error('❌ Google auth error:', error)
      return response.redirect('/login?error=server_error')
    }
  }

  async success({ inertia, request }: HttpContext) {
    const token = request.input('token')
    const user = request.input('user')
    
    return inertia.render('googlesuccess', {
      token: token,
      user: user ? JSON.parse(decodeURIComponent(user)) : null
    })
  }
}