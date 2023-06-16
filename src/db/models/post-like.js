const knex = require("../knex");

class Like {
  static async create(userId, postId) {
    try {
      const checkQuery = `
        SELECT 1
        FROM likes
        WHERE user_id = ? AND post_id = ?`;

      const { rows: checkRows } = await knex.raw(checkQuery, [userId, postId]);

      if (checkRows.length > 0) {
        const deleteQuery = `
          DELETE FROM likes
          WHERE user_id = ? AND post_id = ?`;

        await knex.raw(deleteQuery, [userId, postId]);
        await Like.updateLikeCount(postId); // Update like count in the post table
        return "like deleted";
      }

      const insertQuery = `
        INSERT INTO likes (user_id, post_id)
        VALUES (?, ?)
        RETURNING *`;

      const { rows: insertRows } = await knex.raw(insertQuery, [
        userId,
        postId,
      ]);
      await Like.updateLikeCount(postId); // Update like count in the post table
      return insertRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating post");
    }
  }

  static async didLike(userId, postId) {
    const checkLike = await knex.raw(
      `
      SELECT * FROM likes
      WHERE user_id = ? AND post_id = ?
      `,
      [userId, postId],
    );
    return !!checkLike.rows.length;
  }

  static async likeCount(postId) {
    try {
      const query = "SELECT count(*) FROM likes WHERE post_id = ?";
      const { rows } = await knex.raw(query, [postId]);
      return rows[0].count;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post likes");
    }
  }

  static async updateLikeCount(postId) {
    try {
      const count = await Like.likeCount(postId);
      await knex("posts")
        .where("id", postId)
        .update({ number_of_likes: count });
    } catch (error) {
      console.error(error);
      throw new Error("Error updating post like count");
    }
  }
}

module.exports = Like;
