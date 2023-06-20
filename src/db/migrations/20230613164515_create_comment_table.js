/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("comments", (table) => {
  table.increments("id").primary();
  table.integer("user_id").notNullable();
  table.integer("post_id").notNullable();
  table.integer("number_of_likes").defaultTo(0);
  table.string("comment").notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("comments");
