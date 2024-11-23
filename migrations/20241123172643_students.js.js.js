/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('students', (table) => {
      table.increments('id').notNullable().unique();
      table.boolean('pemission').defaultTo(false);
      table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async(knex) => {
    await knex.schema.dropTable('students')
  };
