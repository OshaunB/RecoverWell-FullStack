const express = require("express");
const postController = require("../controllers/post");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

// List all posts
Router.get("/posts", postController.listPosts);

// List a post by ID
Router.get("/posts/:postId", postController.getPostById);

// Get a post by ID
Router.get("/dis-posts/:id", postController.getPostsByDiscussionId);

Router.get("/u-posts/:userId", postController.getPostsByUserId);

// Create a new post
Router.post("/posts", postController.createPost);

module.exports = Router;
