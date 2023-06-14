const User = require('../db/models/user');
const Discussion = require("../db/models/discussion");

const addModels = (req, res, next) => {
  req.db = {
    User,
    Discussion,
  };
  next();
};

module.exports = addModels;
