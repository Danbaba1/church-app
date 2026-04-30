/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user_accounts', function (table) {
        table.increments('id').primary();
        table.integer('church_id').unsigned().notNullable();
        table.foreign('church_id').references('church_account.id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('telephone', 20).notNullable();
        table.string('gender').notNullable();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user_accounts');
};
