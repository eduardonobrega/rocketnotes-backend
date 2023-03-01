const sqliteConnection = require('../database/sqlite');

class UserRepository {
  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );

    return { id: userId };
  }

  async findByEmail(email) {
    const database = await sqliteConnection();

    const user = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    return user;
  }
}

module.exports = UserRepository;
