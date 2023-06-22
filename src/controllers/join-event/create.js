const createJoinEvent = async (req, res) => {
  try {
    const {
      session,
      db: { JoinEvent },
      body: { eventId },
    } = req;
    console.log(session.userId, eventId);
    const join = await JoinEvent.create(session.userId, eventId);
    res.status(201).json(join);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createJoinEvent;
