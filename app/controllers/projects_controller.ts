import type { HttpContext } from '@adonisjs/core/http'
import Projects from '#models/projects'
import { DateTime } from 'luxon'

export default class ProjectController {
async store({ request, auth, response }: HttpContext) {
  
    await auth.use('api').authenticate()

    const data = request.only(['service_id', 'catatan_user'])

    const project = await Projects.create({
      userId: auth.user!.id,
      serviceId: data.service_id,
      catatanUser: data.catatan_user ?? null,
      statusProject: 'Baru',
      deadline: DateTime.now(),
    })

    return response.status(201).json({
      message: 'Project berhasil dibuat',
      data: project,
    })
}
}
