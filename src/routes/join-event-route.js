const express = require("express");
const joinEventController = require("../controllers/join-event");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.post("/c-join-event", joinEventController.createJoinEvent);

Router.get("/join-event", joinEventController.listAllJoinedEvents);

Router.get("/e-join-event/:eventId", joinEventController.listJoinedEventsByEventId);

Router.get("/u-join-event/:userId", joinEventController.listJoinedEventsByUserId);

Router.get("/check-joined-event/:eventId", joinEventController.checkForJoinedEvent);

Router.delete("/cancel-join-event/:userId/:eventId", joinEventController.deleteJoinEvent);

module.exports = Router;
