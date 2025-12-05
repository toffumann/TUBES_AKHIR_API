// app/Controllers/Http/DashboardController.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ auth, request, inertia }: HttpContext) {
    try {
      console.log('🏠 DASHBOARD CONTROLLER - START')
      console.log('Request URL:', request.url())
      console.log('Token from URL:', request.input('token') ? 'YES' : 'NO')
      
      // Coba authenticate
      await auth.authenticate()
      
      const user = auth.user!
      console.log('✅ Dashboard access granted for:', user.email)
      
      // Return simple data dulu
      return inertia.render('dashboard', {
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email
        },
        message: 'Welcome to Dashboard!'
      })
      
    } catch (error: any) {
      console.log('❌ Dashboard auth failed:', error.message)
      
      // Redirect ke login jika gagal
      return inertia.location('/login')
    }
  }
}