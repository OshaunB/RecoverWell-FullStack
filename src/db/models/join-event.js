const knex = require("../knex");

class JoinEvent {
  static async create(userId, eventId) {
    try {
      const { rows: checkEvent } = await knex.raw(
        `
          SELECT *
          FROM events
          WHERE id = ? AND user_id <> ?
        `,
        [eventId, userId],
      );
      if (checkEvent.length === 0) {
        return "Host cannot join their own event";
      }

      const { rows: checkJoin } = await knex.raw(
        `
          SELECT *
          FROM join_event
          WHERE user_id = ? AND event_id = ?
        `,
        [userId, eventId]
      );
      if (checkJoin.length > 0) {
        return "User already joined event";
      }

      const insertQuery = `
        INSERT INTO join_event (user_id, event_id)
        VALUES (?, ?)
        RETURNING *
      `;
      const { rows: insertRows } = await knex.raw(insertQuery, [
        userId,
        eventId,
      ]);
      return insertRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error joining event");
    }
  }

  static async checkForJoined(userId, eventId) {
    try {
      const { rows: check } = await knex.raw(
        `
          SELECT * FROM join_event
          WHERE user_id = ? AND event_id = ?
        `,
        [userId, eventId],
      );
      return !!check.length;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking event");
    }
  }

  static async deleteEvent(userId, eventId) {
    try {
      const deleteQuery = ` 
        DELETE FROM join_event   
        WHERE user_id = ? AND event_id = ?
        `;
      await knex.raw(deleteQuery, [userId, eventId]);
      return "event deleted";
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting Event");
    }
  }

  static async list() {
    try {
      const { rows: Events } = knex.raw(`SELECT * FROM join_event`);
      return Events;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting list of events");
    }
  }

  static async listByUserId(userId) {
    try {
      const { rows: events } = await knex.raw(`SELECT * FROM join_event WHERE user_id = ?`, [
        userId,
      ]);
      return events;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting list of events");
    }
  }

  static async listByEventId(eventId) {
    try {
      const { rows: events } = await knex.raw(`SELECT * FROM join_event WHERE event_id = ?`, [
        eventId,
      ]);
      return events;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting list of events");
    }
  }
}

module.exports = JoinEvent;
