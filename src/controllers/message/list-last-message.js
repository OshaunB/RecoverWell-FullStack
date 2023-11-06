const getLastMessage = async (req, res) => {
  try {
    const {
      db: { Message },
      session,
      params: { receiverId },
    } = req;
    const messages = await Message.getLastMessage(session.userId, receiverId);
    if (!messages) {
      return res.json("No messages found");
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getLastMessage;
