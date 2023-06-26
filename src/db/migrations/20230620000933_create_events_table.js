/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("events", (table) => {
  table.increments("id").primary();
  table.integer("user_id").notNullable();
  table.string("name").notNullable();
  table.string("description").notNullable();
  table.string("address").notNullable();
  table.string("city").notNullable();
  table.string("state").notNullable();
  table.string("zip").notNullable();
  table.date("date").notNullable();
  table.time("time").notNullable();
  table.integer("expected_guests").notNullable();
  table.string("image").nullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("events");
