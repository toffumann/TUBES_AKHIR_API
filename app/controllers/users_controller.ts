// app/Controllers/Http/UserController.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async me({ auth, response }: HttpContext) {
        try {
            // Pakai auth:api
            await auth.use('api').authenticate()
            
            const user = auth.user!
            
            return response.json({
                success: true,
                data: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    nomorTelepon: user.nomorTelepon,
                    createdAt: user.createdAt
                }
            })
            
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
    }
}