const listAllEvents = async (req, res) => {
  try {
    const {
      db: { Event },
    } = req;
    const event = await Event.getAllEvents();
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const listEventById = async (req, res) => {
  try {
    const {
      db: { Event },
      params: { id },
    } = req;
    const event = await Event.getEventById(id);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listAllEvents,
  listEventById,
};
