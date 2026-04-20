/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('reminders', (table) => {
        table.increments('id').primary();
        table.integer('member_id').unsigned().notNullable();
        table.foreign('member_id').references('members.id');
        table.string('occasion_type').notNullable(); // e.g., 'birthday', 'anniversary'
        table.date('occasion_date').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('reminders');
};
