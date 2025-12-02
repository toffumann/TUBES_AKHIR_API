import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

 async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama_layanan',100).notNullable()
      table.text('deskripsi').nullable()
      table.decimal('harga', 10,2).notNullable()

      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}