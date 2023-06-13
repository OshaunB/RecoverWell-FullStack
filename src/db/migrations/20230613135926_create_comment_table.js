/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("comments", (table) => {
  table.increments("id").primary();
  table.integer("userId").notNullable();
  table.foreign("userId").references("id").inTable("users");
  table.integer("postId").notNullable();
  table.foreign("postId").references("id").inTable("posts");
  table.string("comment").notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("comments");
