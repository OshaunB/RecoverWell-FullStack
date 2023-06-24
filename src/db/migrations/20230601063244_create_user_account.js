/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("users", (table) => {
  table.increments("id").primary();
  table.string("email").notNullable().unique();
  table.string("username").notNullable().unique();
  table.string("password").notNullable();
  table.string("full_name").notNullable();
  table.string("gender").notNullable();
  table.date("dob").notNullable();
  table.string("avatar").nullable();
  table.string("bio").nullable();
  table.string("favorite_quote").nullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("users");
