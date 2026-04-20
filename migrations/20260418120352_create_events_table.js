/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments('id').primary()
        table.integer('church_id').unsigned();
        table.foreign('church_id').references('church_account.id');

        table.string('name', 100).notNullable()
        table.text('description')
        table.date('date')
        table.string('type', 50).notNullable()
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('events')
};
