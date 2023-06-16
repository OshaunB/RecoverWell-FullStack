const createPost = require("./create");
const listPosts = require("./list");
const { getPostsByDiscussionId, getPostById } = require("./post");

module.exports = {
  createPost,
  listPosts,
  getPostsByDiscussionId,
  getPostById,
};
