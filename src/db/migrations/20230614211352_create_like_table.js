/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("likes", (table) => {
  table.increments("id").primary();
  table.integer("userId").notNullable();
  // table.foreign("userId").references("id").inTable("users");
  table.integer("postId").notNullable();
  // table.foreign("postId").references("id").inTable("posts");
  table.timestamp("created_at").defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists("likes");
