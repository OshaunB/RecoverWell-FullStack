const knex = require("../knex");

class Comment {
  static async list() {
    try {
      const query = "SELECT * FROM comments";
      const { rows } = await knex.raw(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting comments");
    }
  }

  static async createComment(userId, postId, comment) {
    try {
      const query = `
        INSERT INTO comments (user_id, post_id, comment)
        VALUES (?, ?, ?)
        RETURNING *`;
      const {
        rows: [com],
      } = await knex.raw(query, [userId, postId, comment]);
      return com;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating comment");
    }
  }
}

module.exports = Comment;
