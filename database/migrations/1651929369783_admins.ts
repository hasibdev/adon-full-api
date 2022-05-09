import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Admins extends BaseSchema {
  protected tableName = 'admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table.string('name', 100).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()

      table.string('avatar', 255).nullable()

      table.boolean('email_verified').defaultTo(false)
      table.timestamp('email_verified_at', { useTz: true }).nullable()

      table.string('guard', 15).defaultTo('admin')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
