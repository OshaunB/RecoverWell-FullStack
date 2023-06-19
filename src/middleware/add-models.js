const User = require("../db/models/user");
const Discussion = require("../db/models/discussion");
const Comment = require("../db/models/comment");
const Post = require("../db/models/post");
const Like = require("../db/models/post-like");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Discussion,
    Comment,
    Post,
    Like,
  };
  next();
};

module.exports = addModels;
