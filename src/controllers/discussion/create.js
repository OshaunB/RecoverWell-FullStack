const createDiscussion = async (req, res) => {
  const {
    db: { Discussion },
    body: { topic, description },
  } = req;

  try {
    const discussion = await Discussion.create(topic, description);
    res.status(201).send(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating discussion");
  }
};

module.exports = createDiscussion;
