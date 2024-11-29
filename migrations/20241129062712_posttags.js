/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('posttags', (table) => {
        table.uuid('id').primary()
        table
        .uuid('tags_id')
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('posttags')
}
