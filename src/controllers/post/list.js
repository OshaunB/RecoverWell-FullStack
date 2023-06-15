const listPosts = async (req, res) => {
  try {
    const {
      db: { Post },
    } = req;
    const posts = await Post.list();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listPosts;
