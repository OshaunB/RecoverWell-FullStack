const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, email, gender, dob, full_name },
  } = req;

  // TODO: check if username is taken, what should you return?
  const user = await User.create(
    email,
    username,
    password,
    full_name,
    gender,
    dob
  );
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
