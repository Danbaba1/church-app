/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('finances', (table) => {
        table.increments('id').primary();
        table.integer('event_id').unsigned().notNullable();
        table.foreign('event_id').references('events.id');
        table.string('giving_type').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.date('date').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('finances');
};
