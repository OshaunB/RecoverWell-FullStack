/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("join_event", (table) => {
  table.increments("id").primary();
  table.integer("user_id").notNullable();
  table.integer("event_id").notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = (knex) => knex.schema.dropTable("join_event");
