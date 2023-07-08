const listByConversationId = async (req, res) => {
  try {
    const {
      db: { Message },
      params: { id },
    } = req;
    if (isNaN(id)) return res.sendStatus(404);
    const exists = await Message.find(id);
    if (!exists) return res.sendStatus(404);
    const messages = await Message.list(id);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listByConversationId;
