const createPost = async (req, res) => {
  try {
    const {
      db: { Post },
      body: { userId, discussionId, content },
    } = req;
    const post = await Post.createPost(userId, discussionId, content);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPost;
