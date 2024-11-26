/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('courses', function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.date('start_time');
    table.date('end_time');
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('courses')
}
