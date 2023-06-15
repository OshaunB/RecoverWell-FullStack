const listComments = async (req, res) => {
  try {
    const {
      db: { Comment },
    } = req;
    const comments = await Comment.list();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listComments;
