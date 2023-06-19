const express = require("express");
const postController = require("../controllers/comment");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

// List all comments
Router.get("/:postId/comments", postController.listComments);

// Create a new comment
Router.post("/comments", postController.createComment);

module.exports = Router;
