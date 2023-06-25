const checkForJoinedEvent = async (req, res) => {
  try {
    const {
      session,
      db: { JoinEvent },
      params: { eventId },
    } = req;
    const joinedEvent = await JoinEvent.checkForJoined(
      session.userId,
      eventId
    );
    res.status(200).json(joinedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkForJoinedEvent;
