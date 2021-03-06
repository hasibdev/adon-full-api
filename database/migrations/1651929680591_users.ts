import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()

      table.string('avatar', 255).nullable()

      table.boolean('email_verified').defaultTo(false)
      table.timestamp('email_verified_at', { useTz: true }).nullable()

      table.boolean('blocked').defaultTo(false)
      table.string('guard', 15).defaultTo('user')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
