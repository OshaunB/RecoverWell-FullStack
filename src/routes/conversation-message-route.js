const express = require("express");
const conversationController = require("../controllers/conversation");
const messageController = require("../controllers/message");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.get("/conversations/:id", conversationController.listById);
Router.post("/conversations", conversationController.createConversation);

Router.get("/messages/:id", messageController.listByConversationId);
Router.post("/messages", messageController.createMessage);

module.exports = Router;
