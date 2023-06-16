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

const getPostById = async (req, res) => {
  try {
    const {
      db: { Post },
      params: { postId },
    } = req;
    console.log(postId);
    const post = await Post.getPostById(postId);
    if (!post) {
      res.status(404).send(`Post with id ${postId} not found`);
    } else {
      res.send(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getPostsByDiscussionId, getPostById };
