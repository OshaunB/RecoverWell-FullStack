const Discussion = require("../models/discussion");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Discussion.create(
    "Introduction and Support",
    "A place to introduce yourself and find support.",
  );

  await Discussion.create(
    "Recovery Strategies",
    "Share and discuss effective strategies for recovery.",
  );

  await Discussion.create(
    "Overcoming Cravings",
    "Discuss techniques for managing and overcoming cravings.",
  );

  await Discussion.create(
    "Mental Health and Substance Abuse",
    "Explore the intersection of mental health and substance abuse recovery.",
  );

  await Discussion.create(
    "Life After Recovery",
    "Share success stories and experiences of life after overcoming substance abuse.",
  );
};
