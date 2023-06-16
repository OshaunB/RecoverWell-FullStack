const checkLike = async (req, res) => {
  try {
    const {
      db: { Like },
      params: { postId },
      session,
    } = req;
    const check = await Like.didLike(session.userId, postId);
    res.status(200).send(check);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error checking like");
  }
};

module.exports = checkLike;
