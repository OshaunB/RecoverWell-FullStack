const knex = require("../knex");
const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class User {
  #passwordHash = null;

  constructor({
    id,
    username,
    password,
    dob,
    gender,
    avatar,
    email,
    full_name,
    favorite_quote,
    bio,
  }) {
    this.id = id;
    this.username = username;
    this.dob = dob;
    this.full_name = full_name;
    this.email = email;
    this.gender = gender;
    this.avatar = avatar;
    this.favorite_quote = favorite_quote;
    this.bio = bio;
    this.#passwordHash = password;
  }

  static async list() {
    const query = "SELECT * FROM users";
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const {
      rows: [user],
    } = await knex.raw(query, [id]);
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const {
      rows: [user],
    } = await knex.raw(query, [username]);
    return user ? new User(user) : null;
  }

  static async findByEmail(email) {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const {
        rows: [user],
      } = await knex.raw(query, [email]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(
    email,
    username,
    password,
    full_name,
    gender,
    dob,
    avatar = null,
    favorite_quote = null,
    bio = null
  ) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (email, username, password, full_name, gender, dob, avatar, favorite_quote, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
    const {
      rows: [user],
    } = await knex.raw(query, [
      email,
      username,
      passwordHash,
      full_name,
      gender,
      dob,
      avatar,
      favorite_quote,
      bio,
    ]);
    return new User(user);
  }

  static async getAvatar(id) {
    const query = "SELECT avatar FROM users WHERE id = ?";
    const {
      rows: [user],
    } = await knex.raw(query, [id]);
    return user ? user.avatar : null;
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE users;");
  }

  updateBio = async (bio) => {
    try {
      const [updatedBio] = await knex("users")
        .where({ id: this.id })
        .update({ bio })
        .returning("*");
      return updatedBio ? new User(updatedBio) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  updateFavoriteQuote = async (quote) => {
    try {
      const [updatedQuote] = await knex("users")
        .where({ id: this.id })
        .update({ favorite_quote: quote })
        .returning("*");
      return updatedQuote ? new User(updatedQuote) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  updateProfilePic = async (profilePic) => {
    try {
      const [updatedUser] = await knex("users")
        .where({ id: this.id })
        .update({ avatar: profilePic })
        .returning("*");
      return updatedUser ? new User(updatedUser) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  update = async (username) => {
    // dynamic queries are easier if you add more properties
    const [updatedUser] = await knex("users")
      .where({ id: this.id })
      .update({ username })
      .returning("*");
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) => isValidPassword(password, this.#passwordHash);
}

module.exports = User;
