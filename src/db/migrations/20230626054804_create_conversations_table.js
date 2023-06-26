/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("conversations", (table) => {
  table.increments("id").primary();
  table.integer("user_id1").notNullable();
  table.integer("user_id2").notNullable();
  table.string("room_name").notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("conversations");
