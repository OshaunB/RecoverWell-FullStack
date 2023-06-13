/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("discussion", (table) => {
  table.increments();
  table.integer("userId").notNullable();
  table.string("topic").notNullable();
  table.string("description").notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("discussion");
