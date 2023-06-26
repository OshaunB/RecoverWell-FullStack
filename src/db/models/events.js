const knex = require("../knex");

class Event {
  static async createEvent(event) {
    try {
      const query = `
        INSERT INTO events (user_id, name, description, address, city, state, zip, date, time, image, expected_guests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *`;
      const {
        rows: [createdEvent],
      } = await knex.raw(query, [
        event.user_id,
        event.name,
        event.description,
        event.address,
        event.city,
        event.state,
        event.zip,
        event.date,
        event.time,
        event.image,
        event.guestCount,
      ]);
      return createdEvent;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating event");
    }
  }

  static async getAllEvents() {
    try {
      const query = `
        SELECT events.*, COUNT(join_event.event_id) AS "joinedEvents" 
        FROM events
        LEFT JOIN join_event
        ON join_event.event_id = events.id
        GROUP BY events.id
      `;
      const { rows: events } = await knex.raw(query);
      return events;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting events");
    }
  }

  static async getEventById(id) {
    try {
      const query = "SELECT * FROM events WHERE id = ?";
      const {
        rows: [event],
      } = await knex.raw(query, [id]);
      return event;
    } catch (error) {
      console.error(error);
      throw new Error(`Error getting event with ID ${id}`);
    }
  }

  static async deleteEvent(userId, eventId) {
    try {
      const deleteFromEvents = "DELETE FROM events WHERE id = ? AND user_id = ?";
      const deleteFromJoinEvent = "DELETE FROM join_event WHERE event_id = ?";
      await knex.raw(deleteFromEvents, [eventId, userId]);
      await knex.raw(deleteFromJoinEvent, [eventId]);
      return "event deleted";
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting event");
    }
  }
}

module.exports = Event;
