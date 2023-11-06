const findByTopic = async (req, res) => {
  const {
    db: { Discussion },
    body: { topic },
  } = req;

  try {
    const discussions = await Discussion.findByTopic(topic);
    res.send(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error finding discussions with topic ${topic}`);
  }
};

const findById = async (req, res) => {
  const {
    params: { id },
    db: { Discussion },
  } = req;

  try {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) return res.status(404).send(`Discussion with id ${id} not found`);
    const discussion = await Discussion.findById(id);
    if (!discussion) {
      res.status(404).send(`Discussion with id ${id} not found`);
    } else {
      res.send(discussion);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error finding discussion with id ${id}`);
  }
};

module.exports = {
  findByTopic,
  findById,
};
