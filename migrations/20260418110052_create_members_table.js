/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('members', (table) => {
        table.increments('id').primary()
        table.integer('church_id').unsigned();
        table.foreign('church_id').references('church_account.id');

        table.string('first_name', 50).notNullable()
        table.string('last_name', 50).notNullable()
        table.string('email', 50).unique().notNullable()
        table.string('phone', 20)
        table.date('date_of_birth')
        table.string('gender', 10);
        table.string('address', 255)
        table.date('date_joined')
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('members')
};
