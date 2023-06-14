const listDiscussions = async (req, res) => {
  const { Discussion } = req.db;

  try {
    const discussions = await Discussion.list();
    res.send(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error listing discussions");
  }
};

module.exports = listDiscussions;
