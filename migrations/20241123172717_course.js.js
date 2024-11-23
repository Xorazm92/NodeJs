/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.createTable('courses', (table) => {
      table.increments('id').notNullable().unique()
      table.string('name').notNullable()
      table.string('descripption')
      table.timestamp('start_time').defaultTo(knex.fn.now())
      table.timestamp('end_time')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const  down = async function(knex) {
   await knex.schema.dropTable('courses') 
  };
