const checkLike = async (req, res) => {
    try {
      const {
        db: { LikeTwo },
        params: { commentId },
        session,
      } = req;
      const check = await LikeTwo.didLike(session.userId, commentId);
      res.status(200).send(check);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error checking like");
    }
  };
  
  module.exports = checkLike;