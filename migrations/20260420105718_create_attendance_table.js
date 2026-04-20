/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('attendance', (table) => {
        table.increments('id').primary();
        table.integer('member_id').unsigned().notNullable();
        table.foreign('member_id').references('members.id');
        table.integer('event_id').unsigned().notNullable();
        table.foreign('event_id').references('events.id');
        table.boolean('present');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('attendance');
};
