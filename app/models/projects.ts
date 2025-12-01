import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Services from './services.js'

export default class Projects extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_user: number

  @column()
  declare id_service: number

  @column()
  declare catatan_user: string | null

  @column()
  declare status_project: 'Baru' | 'Proses' | 'Revisi' | 'Selesai' | 'batal'

  @column.date()
  declare tanggal_mulai: DateTime

  @belongsTo(() => User, { foreignKey: 'id_user' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Services, { foreignKey: 'id_service' })
  declare service: BelongsTo<typeof Services>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
