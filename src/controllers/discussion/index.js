const create = require("./create");
const list = require("./list");
const { findById, findByTopic } = require("./find");

module.exports = {
  create,
  list,
  findById,
  findByTopic,
};
