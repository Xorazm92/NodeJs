/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('comments', (table) => {
        table.uuid('id').primary()
        table
            .uuid('post_id')
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
        table
            .uuid('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.text('text')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('comments')
}
