const createConversation = async (req, res) => {
  const {
    session: { userId },
    db: { Conversation },
    body: { userId2, roomName },
  } = req;

  console.log(userId, userId2, roomName);
  try {
    const conversation = await Conversation.create(userId, userId2, roomName);
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating conversation");
  }
};

module.exports = createConversation;
