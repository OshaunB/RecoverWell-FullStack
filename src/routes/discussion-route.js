const express = require("express");
const discussionController = require("../controllers/discussion");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

// List all discussions
Router.get("/discussions", discussionController.list);

// Get a discussion by ID
Router.get("/discussions/:id", discussionController.findById);

// Create a new discussion
Router.post("/discussions", discussionController.create);

// Search for discussions by topic
Router.post("/discussions/search", discussionController.findByTopic);

module.exports = Router;
