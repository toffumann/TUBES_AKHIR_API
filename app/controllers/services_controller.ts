import type { HttpContext } from '@adonisjs/core/http'
import Services from '#models/services'

export default class ServicesController {
    async store({request, response}: HttpContext){
        const data = request.only(['namaService','deskripsi','harga'])
        const service = await Services.create(data)

        return response.status(200).json({
            message: "sukses",
            service: service
        })
    }

    async index(){
        return Services.all()
    }
}