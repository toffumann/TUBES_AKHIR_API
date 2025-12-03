// app/middleware/auth_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      // Coba authenticate menggunakan guard 'api' (untuk token)
      await ctx.auth.authenticateUsing(options.guards || ['api'], {
        loginRoute: this.redirectTo
      })
      
      // Jika berhasil, attach user ke Inertia props
      if (ctx.auth.user) {
        ctx.inertia.share({
          auth: {
            user: {
              id: ctx.auth.user.id,
              fullName: ctx.auth.user.fullName,
              email: ctx.auth.user.email,
              nomorTelepon: ctx.auth.user.nomorTelepon
            }
          }
        })
      }
      
      return next()
      
    } catch (error) {
      // Untuk Inertia, kita perlu return proper response
      if (ctx.request.accepts(['json', 'html']) === 'json') {
        return ctx.response.unauthorized({
          message: 'Unauthorized',
          requiresAuth: true
        })
      }
      
      // Untuk Inertia page request, redirect ke login
      if (ctx.inertia) {
        return ctx.response.redirect('/login')
      }
      
      // Fallback untuk non-Inertia
      return ctx.response.redirect(this.redirectTo)
    }
  }
}