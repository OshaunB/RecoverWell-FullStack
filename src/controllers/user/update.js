const { isAuthorized } = require("../../utils/auth-utils");

const updateUser = async (req, res) => {
  const {
    session,
    db: { User },
    params: { id },
    body: { username },
  } = req;

  if (!isAuthorized(id, session)) return res.sendStatus(403);

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  const updatedUser = await user.update(username);
  res.send(updatedUser);
};

const updateProfilePic = async (req, res) => {
  const {
    session,
    db: { User },
    params: { id },
    body: { avatar },
  } = req;

  if (!isAuthorized(id, session)) return res.sendStatus(403);

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  const updatedProfile = await user.updateProfilePic(avatar);
  res.send(updatedProfile);
};

module.exports = {
  updateUser,
  updateProfilePic,
};
