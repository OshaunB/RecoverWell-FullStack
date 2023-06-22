const listAllJoinedEvents = async (req, res) => {
  try {
    const {
      db: { JoinEvent },
    } = req;
    const join = await JoinEvent.list();
    res.status(200).json(join);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const listJoinedEventsByUserId = async (req, res) => {
  try {
    const {
      db: { JoinEvent },
      params: { userId },
    } = req;
    const join = await JoinEvent.listByUserId(userId);
    res.status(200).json(join);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const listJoinedEventsByEventId = async (req, res) => {
  try {
    const {
      db: { JoinEvent },
      params: { eventId },
    } = req;
    const join = await JoinEvent.listByEventId(eventId);
    res.status(200).json(join);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listAllJoinedEvents,
  listJoinedEventsByUserId,
  listJoinedEventsByEventId,
};
