const knex = require("../knex");

class Discussion {
  static async list() {
    try {
      const query = "SELECT * FROM discussion";
      const { rows } = await knex.raw(query);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error listing discussions");
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM discussion WHERE id = ?";
      const {
        rows: [discussion],
      } = await knex.raw(query, [id]);
      return discussion || null;
    } catch (error) {
      console.error(error);
      throw new Error(`Error finding discussion with id ${id}`);
    }
  }

  static async findByTopic(topic) {
    try {
      const query = "SELECT * FROM discussion WHERE topic LIKE ?";
      const { rows } = await knex.raw(query, [`%${topic}%`]);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error(`Error finding discussions with topic ${topic}`);
    }
  }

  static async create(topic, description) {
    try {
      const query = `INSERT INTO discussion (topic, description)
        VALUES (?, ?) RETURNING *`;
      const {
        rows: [discussion],
      } = await knex.raw(query, [topic, description]);
      return discussion;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating discussion");
    }
  }
}

// (async () => {
//   const discussion = await Discussion.findById(90);
//   console.log(discussion);
// })();
module.exports = Discussion;
