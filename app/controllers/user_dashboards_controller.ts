import type { HttpContext } from '@adonisjs/core/http'
import Projects from '#models/projects'

export default class UserDashboardsController {
    async show({ params, auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    const project = await Projects
      .query()
      .where('id', params.id)
      .where('id_user', auth.user!.id)
      .preload('service')
      .preload('user')
      .first()

    if (!project) {
      return response.status(404).json({ message: 'Project tidak ditemukan' })
    }

    return response.status(200).json({
      message: 'Detail project',
      data: project,
    })
  }

  async update({ params, request, auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    const project = await Projects
      .query()
      .where('id', params.id)
      .where('id_user', auth.user!.id)
      .first()

    if (!project) {
      return response.status(404).json({ 
        message: 'Project tidak ditemukan'
     })
    }

    const data = request.only(['catatan_user'])

    if (data.catatan_user !== undefined) {
      project.catatanUser = data.catatan_user
    }

    await project.save()

    return response.status(200).json({
      message: 'Project berhasil diperbarui',
      data: project,
    })
  }

  async index({ auth, response }: HttpContext) {
    await auth.authenticate()

    const projects = await Projects
      .query()
      .where('id_user', auth.user!.id)
      .preload('service')
      .preload('user')

    return response.status(200).json({
      message: 'Daftar project',
      data: projects,
    })
  }
}