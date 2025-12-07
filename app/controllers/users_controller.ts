// app/Controllers/Http/UserController.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async me({ auth, response }: HttpContext) {
            // Pakai auth:api
          await auth.use('api').authenticate()
            
          const user = auth.user!
            
          return response.status(200).json({
              success: true, 
              user,
          })
            
      } 
    
}