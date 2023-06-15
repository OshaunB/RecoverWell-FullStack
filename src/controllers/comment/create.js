const createComment = async (req, res) => {
  try {
    const {
      db: { Comment },
      body: { userId, postId, comment },
    } = req;
    const com = await Comment.createComment(userId, postId, comment);
    res.status(201).json(com);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createComment;
