const listByConversationId = async (req, res) => {
  try {
    const {
      db: { Message },
      params: { id },
    } = req;
    const messages = await Message.list(id);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listByConversationId;
