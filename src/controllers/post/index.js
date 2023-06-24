const createPost = require("./create");
const listPosts = require("./list");
const {
  getPostsByDiscussionId,
  getPostById,
  getPostsByUserId,
} = require("./post");

module.exports = {
  createPost,
  listPosts,
  getPostsByDiscussionId,
  getPostById,
  getPostsByUserId,
};
