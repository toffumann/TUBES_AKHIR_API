import type { HttpContext } from '@adonisjs/core/http'

export default class UserController{
    async me({auth}: HttpContext){
        await auth.authenticate()
        return auth.user
    }
}
