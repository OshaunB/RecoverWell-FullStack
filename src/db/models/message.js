const knex = require("../knex");

class Message {
  static async list(conversationId) {
    try {
      if (Number.isNaN(conversationId)) {
        return "Require truthy values";
      }
      const query = "SELECT * FROM messages WHERE conversation_id = ?";
      const { rows } = await knex.raw(query, [conversationId]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error listing messages");
    }
  }

  static async getLastMessage(senderId, receiverId) {
    try {
      const query = `
        SELECT * FROM messages
        WHERE (sender_id = ?
        AND receiver_id = ?) 
        OR (sender_id = ? 
        AND receiver_id = ?)
        `;
      const { rows } = await knex.raw(query, [
        senderId,
        receiverId,
        receiverId,
        senderId,
      ]);
      return rows[rows.length - 1];
    } catch (error) {
      console.error(error);
      throw new Error("Error getting last message");
    }
  }

  static async create(conversationId, senderId, receiverId, message) {
    try {
      const {
        rows: [rows],
      } = await knex.raw(
        `INSERT INTO messages (conversation_id, sender_id, receiver_id, message) VALUES (?, ?, ?, ?) RETURNING *`,
        [conversationId, senderId, receiverId, message]
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating message");
    }
  }
}

module.exports = Message;
