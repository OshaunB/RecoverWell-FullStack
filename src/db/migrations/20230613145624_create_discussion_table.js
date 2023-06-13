/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("discussion", (table) => {
  table.increments("id").primary();
  table.integer("userId").notNullable();
  table.foreign("userId").references("id").inTable("user");
  table.string("topic").notNullable();
  table.string("description").nullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("discussion");
