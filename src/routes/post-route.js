const express = require("express");
const postController = require("../controllers/post");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

// List all posts
Router.get("/posts", postController.listPosts);

// Get a post by ID
Router.get("/posts/:id", postController.getPostsByDiscussionId);

// Create a new post
Router.post("/posts", postController.createPost);

module.exports = Router;
