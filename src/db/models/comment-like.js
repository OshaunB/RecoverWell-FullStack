const knex = require("../knex");
class LikeTwo {
    static async create(userId, commentId) {
      try {
        const checkQuery = `
          SELECT 1
          FROM likesTwo
          WHERE user_id = ? AND comment_id = ?`;
        const { rows: checkRows } = await knex.raw(checkQuery, [userId, commentId]);
        if (checkRows.length > 0) {
          const deleteQuery = `
            DELETE FROM likesTwo
            WHERE user_id = ? AND comment_id = ?`;
          await knex.raw(deleteQuery, [userId, commentId]);
          await Like.updateLikeCount(commentId); // Update like count in the comment table
          return "like deleted";
        }
        const insertQuery = `
          INSERT INTO likesTwo (user_id, comment_id)
          VALUES (?, ?)
          RETURNING *`;
        const { rows: insertRows } = await knex.raw(insertQuery, [
          userId,
          commentId
        ]);
        await Like.updateLikeCount(commentId); // Update like count in the post table
        return insertRows;
      } catch (error) {
        console.error(error);
        throw new Error("Error creating post");
      }
    }
    static async didLike(userId, commentId) {
      const checkLike = await knex.raw(
        `
        SELECT * FROM likesTwo
        WHERE user_id = ? AND comment_id = ?
        `,
        [userId, commentId],
      );
      return !!checkLike.rows.length;
    }
    static async likeCount(commentId) {
      try {
        const query = "SELECT count(*) FROM likesTwo WHERE comment_id = ?";
        const { rows } = await knex.raw(query, [commentId]);
        return rows[0].count;
      } catch (error) {
        console.error(error);
        throw new Error("Error getting comment likes");
      }
    }
    static async updateLikeCount(commentId) {
      try {
        const count = await Like.likeCount(commentId);
        await knex("comments")
          .where("id", postId)
          .update({ number_of_likes: count });
      } catch (error) {
        console.error(error);
        throw new Error("Error updating comment like count");
      }
    }
  }
  module.exports = LikeTwo;