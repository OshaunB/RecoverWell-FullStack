/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("posts", (table) => {
  table.increments();
  table.integer("userId").notNullable();
  table.integer("discussionId").notNullable();
  table.integer("numberOfLikes").notNullable();
  table.string("content").notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("posts");
