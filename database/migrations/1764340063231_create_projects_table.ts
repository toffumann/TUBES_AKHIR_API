import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE')

      table.string('catatan_user').nullable()
      table.enum('status_project', ['Baru', 'Proses', 'Revisi', 'Selesai', 'Batal']).defaultTo('Baru')

      table.date('deadline').notNullable()

      // MIDTRANS FIELD
      table.string('order_id').nullable()
      table.string('payment_status').defaultTo('pending')
      table.string('snap_token').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
