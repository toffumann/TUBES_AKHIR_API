import type { HttpContext } from '@adonisjs/core/http'
import Projects from '#models/projects'

export default class WebhookController {
  async midtrans({ request, response }: HttpContext) {
    const body = request.body()

    const project = await Projects.query()
      .where('orderId', body.order_id)
      .first()

    if (!project) return response.ok({ message: 'Project Tidak Ditemukan' })

    project.paymentStatus = body.transaction_status
    await project.save()

    return response.json({
       message: 'Updated' 
      })
  }
}
