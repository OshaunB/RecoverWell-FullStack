const User = require("../models/user");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await User.deleteAll();
  await User.create(
    "user1@example.com",
    "johndoe",
    "123",
    "John Doe",
    "Male",
    "1990-01-01",
  );

  await User.create(
    "user2@example.com",
    "janesmith",
    "123",
    "Jane Smith",
    "Female",
    "1967-01-01",
  );

  await User.create(
    "user3@example.com",
    "michalelJohnson",
    "123",
    "Michael Johnson",
    "Male",
    "1990-06-01",
  );

  await User.create(
    "user4@example.com",
    "emilydavis",
    "123",
    "Emily Davis",
    "Female",
    "1990-01-09",
  );

  await User.create(
    "user5@example.com",
    "davidwilson",
    "123",
    "David Wilson",
    "Male",
    "1950-01-01",
  );
};
