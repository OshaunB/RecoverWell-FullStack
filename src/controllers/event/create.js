const createEvent = async (req, res) => {
  try {
    const {
      session: { userId },
      db: { Event },
    } = req;
    console.log(userId);
    console.log(req.body);
    const event = await Event.createEvent({ user_id: userId, ...req.body });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createEvent;
