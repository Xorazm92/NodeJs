/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').notNullable().unique();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp('created_date').defaultTo(knex.fn.now())
      table.timestamp('last_login').defaultTo(knex.fn.now())
      table.enum('role', ['user', 'admin']).defaultTo('user')
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('users')
  };
