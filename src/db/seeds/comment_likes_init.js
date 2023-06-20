const Like = require("../models/comment-like");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Like.create(1, 1);
  await Like.create(2, 1);
  await Like.create(3, 2);
  await Like.create(4, 2);
  await Like.create(5, 3);
  await Like.create(1, 3);
  await Like.create(2, 4);
  await Like.create(3, 4);
  await Like.create(4, 5);
  await Like.create(5, 5);
  await Like.create(1, 6);
  await Like.create(2, 6);
  await Like.create(3, 7);
  await Like.create(4, 7);
  await Like.create(5, 8);
  await Like.create(1, 8);
  await Like.create(2, 9);
  await Like.create(3, 9);
  await Like.create(4, 10);
  await Like.create(5, 10);
};
