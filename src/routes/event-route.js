const express = require("express");
const eventController = require("../controllers/event");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.get("/events", eventController.listAllEvents);

Router.get("/events/:id", eventController.listEventById);

Router.post("/createEvent", eventController.createEvent);

Router.delete("/deleteEvent/:userId/:eventId", eventController.deleteEvent);

module.exports = Router;
