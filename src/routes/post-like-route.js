const express = require("express");
const postLikeController = require("../controllers/post-like");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.post("/posts-like", postLikeController.updatePostLike);

Router.get("/check-post-like/:postId", postLikeController.checkLike);

module.exports = Router;
