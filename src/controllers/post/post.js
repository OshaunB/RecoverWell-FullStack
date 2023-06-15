const getPostsByDiscussionId = async (req, res) => {
  try {
    const {
      db: { Post },
      params: { id },
    } = req;
    const posts = await Post.getPostsByDiscussionId(id);
    if (!posts) {
      res.status(404).send(`Discussion with id ${id} not found`);
    } else {
      res.send(posts);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getPostsByDiscussionId;
