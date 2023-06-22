const User = require("../db/models/user");
const Discussion = require("../db/models/discussion");
const Comment = require("../db/models/comment");
const Post = require("../db/models/post");
const Like = require("../db/models/post-like");
const Event = require("../db/models/events");

const Join = require("../db/models/join-event");
const addModels = (req, res, next) => {
  req.db = {
    User,
    Discussion,
    Comment,
    Post,
    Like,
    Event,
    Join
  };
  next();
};

module.exports = addModels;
