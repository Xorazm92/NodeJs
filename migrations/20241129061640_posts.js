/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('posts', (table) => {
        table.uuid('id').primary()
        table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        table
            .uuid('category_id')
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
        table.string('title')
        table.string('body')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable('posts')
}

