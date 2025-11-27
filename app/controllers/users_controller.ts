import type { HttpContext } from '@adonisjs/core/http'
import 

export default class UsersController {
    async index({request, response}: HttpContext){
        const data = request.only(['fullName', 'email', 'password', 'nomorTelepon'])
        return response = data.al
    }

}