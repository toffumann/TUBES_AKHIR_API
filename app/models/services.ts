import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Projects from './projects.js'

export default class Services extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName: 'nama_layanan'})
  declare namaService: string

  @column()
  declare deskripsi: string | null

  @column()
  declare harga: number

  @hasMany(() => Projects, { foreignKey: 'id_service' })
  declare projects: HasMany<typeof Projects>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
