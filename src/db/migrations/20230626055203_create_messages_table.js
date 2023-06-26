/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("messages", (table) => {
  table.increments("id").primary();
  table.integer("conversation_id").notNullable();
  table.integer("sender_id").notNullable();
  table.integer("receiver_id").notNullable();
  table.string("message").notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("messages");
