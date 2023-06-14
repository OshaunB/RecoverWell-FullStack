const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class User {
  #passwordHash = null;

  constructor({ id, username, password_hash, DOB, gender, avatar, email, full_name}) {
    this.id = id;
    this.username = username;
    this.DOB = DOB
    this.full_name = full_name
    this.email = email
    this.gender = gender
    this.avatar = avatar
    this.#passwordHash = password_hash;
  }

  static async list() {
    const query = 'SELECT * FROM users';
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const { rows: [user] } = await knex.raw(query, [id]);
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const { rows: [user] } = await knex.raw(query, [username]);
    return user ? new User(user) : null;
  }

  static async create(username, password, email, gender, DOB, full_name, avatar = null) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, email, gender, dob, avatar, full_name)
      VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`;
    const { rows: [user] } = await knex.raw(query, [username, passwordHash, email, gender, DOB, avatar, full_name]);
    return new User(user);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE users;');
  }

  update = async (username) => { // dynamic queries are easier if you add more properties
    const [updatedUser] = await knex('users')
      .where({ id: this.id })
      .update({ username })
      .returning('*');
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) => (
    isValidPassword(password, this.#passwordHash)
  );
}

module.exports = User;
