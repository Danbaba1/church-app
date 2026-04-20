/**
 * @param { import("knex").Knex } knex
 * @returns { Promise < void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('church_account', (table) => {
        table.increments('id').primary()

        table.string('name', 100).notNullable()
        table.string('address', 255)
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('church_account')
};
