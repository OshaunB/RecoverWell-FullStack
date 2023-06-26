const createEvent = require("./create");
const { listEventById, listAllEvents } = require("./list");
const deleteEvent = require("./delete");

module.exports = {
  createEvent,
  listEventById,
  listAllEvents,
  deleteEvent,
};
