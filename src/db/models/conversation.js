const knex = require("../knex");

class Conversation {
  static async list(id) {
    try {
      const query = "SELECT * FROM conversations WHERE id = ?";
      const { rows: [rows] } = await knex.raw(query, [id]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error listing conversations");
    }
  }

  static async create(userId1, userId2, roomName) {
    try {
      if (!userId1 || !userId2 || !roomName) {
        return "Require truthy values";
      }
      const checkIfItExists = await knex.raw(
        `SELECT * FROM conversations 
        WHERE (user_id1 = ? AND user_id2 = ?)
        OR (user_id1 = ? AND user_id2 = ?)`,
        [userId1, userId2, userId2, userId1],
      );

      if (checkIfItExists.rows.length > 0) {
        return checkIfItExists.rows[0];
      }
      const query = `INSERT INTO conversations (user_id1, user_id2, room_name)
        VALUES (?, ?, ?) RETURNING *`;

      const {
        rows: [conversation],
      } = await knex.raw(query, [userId1, userId2, roomName]);
      return conversation;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating conversation");
    }
  }
}

module.exports = Conversation;
