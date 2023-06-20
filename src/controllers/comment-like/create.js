const updateLike = async (req, res) => {
    const {
      session,
      db: { LikeTwo },
      body: { commentId },
    } = req;
    try {
      const update = await LikeTwo.create(session.userId, commentId);
      res.status(201).json(update);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating like");
    }
  };
  
  module.exports = updateLike;
  