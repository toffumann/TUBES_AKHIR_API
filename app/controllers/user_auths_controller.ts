import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/register'
import { loginValidator } from '#validators/login'

export default class UserAuthsController {
    async Register({request, response}: HttpContext){
        const payload = await registerValidator.validate(request.all())
            await User.create({
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
                nomorTelepon: payload.nomorTelepon
            })
        return response.redirect('/login')
    }

    async Login({request, response}: HttpContext){
        const payload = await loginValidator.validate(request.all())
        const user = await User.verifyCredentials(payload.email, payload.password)
        const token = await User.accessTokens.create(user, ['*'],{
            expiresIn: '3hours',
        })

        return response.json({
            message: 'Login Berhasil',
            token: token.value,
            type: 'Bearer',
            expires_in: token.expiresAt
        })

    }

    async Logout({auth, response}: HttpContext){
        await auth.use('api').invalidateToken

        return response.json({
            message: 'Logout Berhasil',
        })
    }
}