import type { HttpContext } from '@adonisjs/core/http'
import Projects from '#models/projects'

export default class WebhookController {
  async midtrans({ request, response }: HttpContext) {
    const body = request.body()

    console.log(body)

    if (!body.order_id) {
      return response.badRequest({
        message: "order_id tidak ditemukan dalam webhook"
      })
    }

   const project = await Projects.query()
     .where('orderId', body.order_id)
      .first()

    if (!project) {
      return response.status(404).json({ 
        message: 'Project Tidak Ditemukan' 
      })
   }

   project.paymentStatus = body.transaction_status
    await project.save()

    return response.status(200).json({
       message: 'Updated' 
      })
  } 
}
