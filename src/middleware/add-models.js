const User = require("../db/models/user");
const Discussion = require("../db/models/discussion");
const Comment = require("../db/models/comment");
const Post = require("../db/models/post");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Discussion,
    Comment,
    Post,
  };
  next();
};

module.exports = addModels;
