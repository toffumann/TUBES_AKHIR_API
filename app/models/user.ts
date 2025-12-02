// app/models/user.ts (VERSI SEDERHANA)
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare nomorTelepon: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare provider: string | null

  @column()
  declare providerId: string | null

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Auto hash password sebelum save
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await hash.make(user.password)
    }
  }

  // Method untuk verify password (manual)
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return hash.verify(this.password, plainPassword)
  }
}