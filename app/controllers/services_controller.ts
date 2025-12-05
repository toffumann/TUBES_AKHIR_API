import type { HttpContext } from '@adonisjs/core/http'
import Services from '#models/services'

export default class ServicesController {
    async store({request, response}: HttpContext){
        const data = request.only(['nama_layanan','deskripsi','harga'])
        const service = await Services.create(data)

        return response.status(200).json({
            message: "sukses",
            service: service
        })
    }

    async index({response}: HttpContext){
        const data = await Services.all()
        return response.status(200).json({
            message: "sukses",
            Services: data,
        })
        
    }
}