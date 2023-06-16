const updateLike = async (req, res) => {
  const {
    session,
    db: { Like },
    body: { postId },
  } = req;
  try {
    const update = await Like.create(session.userId, postId);
    res.status(201).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating like");
  }
};

module.exports = updateLike;
