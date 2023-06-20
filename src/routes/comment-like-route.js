const express = require("express");
const commentLikeController = require("../controllers/comment-like");
const addModels = require("../middleware/add-models");

const Router = express.Router();
Router.use(addModels);

Router.post("/comments-like", commentLikeController.updatePostLike);

Router.get("/check-comment-like/:commentId", commentLikeController.checkLike);

module.exports = Router;