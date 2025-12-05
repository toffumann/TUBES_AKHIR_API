import type { HttpContext } from '@adonisjs/core/http'
import Projects from '#models/projects'
import { DateTime } from 'luxon'

export default class ProjectController {
  /**
   * GET /projects
   * List semua project milik user login
   
  async index({ auth }: HttpContext) {
    await auth.authenticate()

    const projects = await Projects
      .query()
      .where('id_user', auth.user!.id)
      .preload('service')
      .preload('user')

    return {
      message: 'Daftar project',
      data: projects,
    }
  }*/

  /**
   * POST /projects
   * User memesan layanan → membuat project baru
   */
  async store({ request, auth, response }: HttpContext) {
    await auth.authenticate()

    const data = request.only(['service_id', 'catatan_user'])

    const project = await Projects.create({
      userId: auth.user!.id,
      serviceId: data.service_id,
      catatanUser: data.catatan_user ?? null,
      statusProject: 'Baru',
      deadline: DateTime.now(),
    })

    return response.created({
      message: 'Project berhasil dibuat',
      data: project,
    })
  }

  /**
   * GET /projects/:id
   * Detail project user login
   
  async show({ params, auth, response }: HttpContext) {
    await auth.authenticate()

    const project = await Projects
      .query()
      .where('id', params.id)
      .where('id_user', auth.user!.id)
      .preload('service')
      .preload('user')
      .first()

    if (!project) {
      return response.notFound({ message: 'Project tidak ditemukan' })
    }

    return {
      message: 'Detail project',
      data: project,
    }
  }

  /**
   * PATCH /projects/:id
   * User update catatan atau status (opsional)
   
  async update({ params, request, auth, response }: HttpContext) {
    await auth.authenticate()

    const project = await Projects
      .query()
      .where('id', params.id)
      .where('id_user', auth.user!.id)
      .first()

    if (!project) {
      return response.notFound({ message: 'Project tidak ditemukan' })
    }

    const data = request.only(['catatan_user'])

    if (data.catatan_user !== undefined) {
      project.catatanUser = data.catatan_user
    }

    await project.save()

    return {
      message: 'Project berhasil diperbarui',
      data: project,
    }
  }*/
}
