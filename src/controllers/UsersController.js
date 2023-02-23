const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password)
      throw new AppError('Preencha todos os campos');

    const database = await sqliteConnection();

    const checkIfUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (checkIfUserExists) throw new AppError('Este e-mail já estar em uso!');

    const hashedPassword = await hash(password, 8);

    await database.run(
      `
      INSERT INTO users 
      (name, email, password)
      VALUES
      (?, ?, ?)
    `,
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, oldPassword, newPassword } = request.body;
    const id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) throw new AppError('Usuário não encontrado!');

    const emailAlreadyRegistered = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (emailAlreadyRegistered && emailAlreadyRegistered.id !== user.id) {
      throw new AppError('Email já está sendo usado!');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (newPassword && !oldPassword) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha!'
      );
    }

    if (newPassword && oldPassword) {
      const validOldPassword = await compare(oldPassword, user.password);

      if (!validOldPassword) {
        throw new AppError('Senha antiga não confere!');
      }

      user.password = await hash(newPassword, 8);
    }

    await database.run(
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

    return response.json();
  }
}

module.exports = UsersController;
