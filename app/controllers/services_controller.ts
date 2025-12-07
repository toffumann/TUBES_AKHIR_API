import type { HttpContext } from '@adonisjs/core/http'
import Services from '#models/services'

export default class ServicesController {
    // untuk admin memasukan data layanan
    async store({request, response}: HttpContext){
        const data = request.only(['nama_layanan','deskripsi','harga'])
        const service = await Services.create(data)

        return response.status(200).json({
            message: "sukses",
            service: service
        })
    }

    
    // untuk user melihat semua layanan
    async index({response,auth}: HttpContext){

        await auth.use('api').authenticate()

        const data = await Services.all()
        return response.json({
            message: "sukses",
            services: data,
        })
        
    }
}