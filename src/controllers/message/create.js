const createMessage = async (req, res) => {
  const {
    session: { userId },
    db: { Message },
    body: { conversationId, receiver_id, message },
  } = req;

  try {
    const text = await Message.create(
      conversationId,
      userId,
      receiver_id,
      message
    );
    res.status(201).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating discussion");
  }
};

module.exports = createMessage;
