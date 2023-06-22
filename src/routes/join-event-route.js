const express = require("express");
const joinEventController = require("../controllers/join-event")
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.post("/c-join-event" , joinEventController.createJoinEvent)

Router.get("/join-event" , joinEventController.findAll) 

Router.get("/e-join-event/:eventId" , joinEventController.findByEventId)

Router.get("/u-join-event/:userId" , joinEventController.findByUserId)

Router.delete("/d-join-event" , joinEventController.deleteJoinEvent)

module.exports = Router;