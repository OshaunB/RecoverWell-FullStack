/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("posts", (table) => {
  table.increments("id").primary();
  table.integer("user_id").notNullable();
  table.integer("discussion_id").notNullable();
  table.integer("number_of_likes").defaultTo(0);
  table.string("content").notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("posts");
