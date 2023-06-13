/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("posts", (table) => {
  table.increments();
  table.integer("userId").notNullable();
  table.foreign("userId").references("id").inTable("users");
  table.integer("discussionId").notNullable();
  table.foreign("discussionId").references("id").inTable("discussion");
  table.integer("numberOfLikes").defaultTo(0);
  table.string("content").notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("posts");
