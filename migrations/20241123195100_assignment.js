/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('assigments', function(table){
        table.increments('id').primary();
        table.integer('course_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('courses')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('student_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('students')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('teacher_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('teachers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
      })
     
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('assigments')
}
