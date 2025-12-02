// database/migrations/1763462151763_create_users_table.js
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('nomor_telepon', 20).nullable()
      table.string('avatar_url').nullable()
      table.string('provider').nullable()
      table.string('provider_id').nullable()
      table.timestamp('email_verified_at').nullable()
      
      // FIX: Untuk MySQL/MariaDB
      table.timestamp('created_at').defaultTo(this.now()) // 👈 PERUBAHAN DI SINI
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}