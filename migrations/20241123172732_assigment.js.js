/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const  up = async function(knex) {
    await knex.schema.createTable('assigments', (table) => {
      table.increments('id').notNullable().unique()
      table.integer('course_id').references('id').inTable('courses').onDelete("CASCADE")
      table.integer('student_id').references('id').inTable('students').onDelete("CASCADE")
      table.integer('teacher_id').references('id').inTable('teachers').onDelete("SET NULL").nullable()
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function(knex) {
    await knex.schema.dropTable('assigments')
  };
  