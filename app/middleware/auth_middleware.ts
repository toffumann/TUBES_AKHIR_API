// app/middleware/auth_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.session.get('user')
    
    if (!user) {
      return ctx.response.redirect().toPath('/login')
    }
    
    // Simpan user di request header (cara yang lebih aman)
    ctx.request.request.headers['x-user-id'] = user.id.toString()
    
    // Atau gunakan ctx.request.all()['user'] = user
    // Tapi cara terbaik adalah menggunakan session saja
    
    await next()
  }
}