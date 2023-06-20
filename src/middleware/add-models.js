const User = require("../db/models/user");
const Discussion = require("../db/models/discussion");
const Comment = require("../db/models/comment");
const Post = require("../db/models/post");
const Like = require("../db/models/post-like");
const LikeTwo = require("../db/models/comment-like")
const Event = require("../db/models/events");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Discussion,
    Comment,
    Post,
    Like,
    LikeTwo,
    Event,
  };
  next();
};

module.exports = addModels;
