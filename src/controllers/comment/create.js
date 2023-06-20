const createComment = async (req, res) => {
  try {
    const {
      session,
      db: { Comment },
      body: { postId, comment },
    } = req;
    const com = await Comment.createComment(session.userId, postId, comment);
    res.status(201).json(com);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createComment;
