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

        return response.status(201).json({
            message: 'akun berhasil dibuat',
        })
    }

    async Login({request, response, auth}: HttpContext){
        const payload = await loginValidator.validate(request.all())
        const user = await User.verifyCredentials(payload.email, payload.password)

        const token = await auth.use('api').createToken(user)

       response.cookie('token', token.value, {
            httpOnly: true,
            secure: false, // ubah true di production
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 hari
       })

       return response.status(200).json({
            message: 'Login Berhasil',
            user,
       })

    }

    async Logout({auth, response}: HttpContext){
        try {
            await auth.use('api').invalidateToken
        } catch (error){

        }

        response.clearCookie('token')

        return response.status(200).json({
            message: 'Logout Berhasil',
        })
    }
}