const createPost = async (req, res) => {
  try {
    const {
      session,
      db: { Post },
      body: { discussionId, content },
    } = req;
    console.log(session.userId, discussionId, content);
    const post = await Post.createPost(session.userId, discussionId, content);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPost;
