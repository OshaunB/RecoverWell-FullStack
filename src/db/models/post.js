const knex = require("../knex");

class Post {
  static async list() {
    try {
      const query = "SELECT * FROM posts";
      const { rows } = await knex.raw(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting posts");
    }
  }

  static async createPost(userId, discussionId, content) {
    try {
      const query = `
        INSERT INTO posts (user_id, discussion_id, content)
        VALUES (?, ?, ?)
        RETURNING *`;
      const {
        rows: [post],
      } = await knex.raw(query, [userId, discussionId, content]);
      return post;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating post");
    }
  }

  static async getPostsByDiscussionId(discussionId) {
    try {
      const query = "SELECT * FROM posts WHERE discussion_id = ?";
      const { rows } = await knex.raw(query, [discussionId]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error getting posts for discussion with ID ${discussionId}`
      );
    }
  }

  static async getPostsByUserId(userId) {
    try {
      const query = "SELECT * FROM posts WHERE user_id = ?";
      const { rows } = await knex.raw(query, [userId]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Error getting posts for userId with ID ${userId}`);
    }
  }

  static async getPostById(postId) {
    try {
      const query = "SELECT * FROM posts WHERE id = ?";
      const {
        rows: [post],
      } = await knex.raw(query, [postId]);
      return post;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post");
    }
  }
}

module.exports = Post;
