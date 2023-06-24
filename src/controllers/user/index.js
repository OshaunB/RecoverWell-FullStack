const list = require("./list");
const create = require("./create");
const show = require("./show");
const {
  updateUser,
  updateProfilePic,
  updateBio,
  updateFavoriteQuote,
} = require("./update");

const login = require("./login");
const logout = require("./logout");
const showMe = require("./show-me");

module.exports = {
  list,
  create,
  show,
  updateUser,
  login,
  logout,
  showMe,
  updateProfilePic,
  updateBio,
  updateFavoriteQuote,
};
