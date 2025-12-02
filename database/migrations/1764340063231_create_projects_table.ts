import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_klien').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('id_proyek').unsigned().references('id').inTable('services').notNullable()
      table.string('jenis_desain', 255).notNullable()
      table.date('deadline').notNullable()
      table.enum('status', ['Baru', 'Proses', 'Revisi', 'Selesai', 'Batal']).defaultTo('Baru').notNullable()

      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}