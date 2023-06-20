/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("likesTwo", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("comment_id").notNullable();
    table.timestamps(true, true);
});
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("likesTwo");