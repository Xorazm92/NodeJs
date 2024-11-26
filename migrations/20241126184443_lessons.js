/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("lessons", (table) => {
    table.increments("id").primary();
    table
      .integer("assigment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("assigments")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("homework_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("homeworks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("title").notNullable();
    table.date("start_date");
    table.date("end_date");
    table.string("video_path");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("lessons");
}
