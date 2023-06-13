/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("comments", (table) => {
  table.increments();
  table.integer("userId").notNullable();
  table.integer("postId").notNullable();
  table.string("comment").notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("comments");
