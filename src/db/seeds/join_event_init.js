const Join = require("../models/join-event");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async (knex) => {
  await Join.create(1, 1);
  await Join.create(1, 2);
  await Join.create(1, 3);
  await Join.create(1, 1);
  await Join.create(2, 1);
  await Join.create(2, 3);
  await Join.create(3, 2);
  await Join.create(3, 2);
  await Join.create(2, 4);
  await Join.create(2, 3);
};
