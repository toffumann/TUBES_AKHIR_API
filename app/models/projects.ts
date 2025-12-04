import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Services from './services.js'

export default class Projects extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column({columnName: 'service_id'})
  declare serviceId: number

  @column()
  declare catatanUser: string | null

  @column()
  declare statusProject: 'Baru' | 'Proses' | 'Revisi' | 'Selesai' | 'Batal'

  @column.date()
  declare deadline: DateTime

  // MIDTRANS
  @column()
  declare orderId: string | null

  @column()
  declare paymentStatus: string

  @column()
  declare snapToken: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Services, {
    foreignKey: 'serviceId',
  })
  declare service: BelongsTo<typeof Services>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
