const listById = async (req, res) => {
  try {
    const {
      db: { Conversation },
      params: { id },
    } = req;
    const conversation = await Conversation.list(id);
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listById;
