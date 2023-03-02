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

  async update(user) {
    const database = await sqliteConnection();

    const retorno = await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password= ?,
      updated_at = DATETIME('now')
      WHERE id = ?
      `,
      [user.name, user.email, user.password, user.id]
    );
  }

  async findById(id) {
    const database = await sqliteConnection();

    const user = database.get('SELECT * FROM users WHERE id = (?)', [id]);

    return user;
  }

  async findByEmail(email) {
    const database = await sqliteConnection();

    const user = await database.get('SELECT * FROM users WHERE email = (?)', [
      email,
    ]);

    return user;
  }
}

module.exports = UserRepository;
