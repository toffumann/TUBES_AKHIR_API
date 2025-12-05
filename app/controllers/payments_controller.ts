import type { HttpContext } from '@adonisjs/core/http'
import midtransClient from 'midtrans-client'
import Projects from '#models/projects'

export default class PaymentController {
  public async create({ params, auth, response }: HttpContext) {
    await auth.authenticate()

    const project = await Projects.query()
      .where('id', params.id)
      .preload('service')
      .firstOrFail()

    const service = project.service

    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PROD === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    })

    const orderId = `ORDER-${project.id}-${Date.now()}`

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: service.harga,
      },
      customer_details: {
        first_name: auth.user!.fullName,
        email: auth.user!.email,
      },
    }

    // Create transaction
    const transaction = await snap.createTransaction(parameter)

    // SAVE MIDTRANS DATA KE PROJECT
    project.orderId = orderId
    project.snapToken = transaction.token
    project.paymentStatus = 'pending'
    await project.save()

    return response.ok({
      snapToken: transaction.token,
      redirectUrl: transaction.redirect_url,
    })
  }
}
