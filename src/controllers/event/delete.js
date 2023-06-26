const { isAuthorized } = require("../../utils/auth-utils");

const deleteEvent = async (req, res) => {
  try {
    const {
      session,
      db: { Event },
      params: { userId, eventId },
    } = req;

    if (!isAuthorized(userId, session)) return res.sendStatus(403);
    const del = await Event.deleteEvent(session.userId, eventId);
    res.status(201).json(del);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteEvent;
