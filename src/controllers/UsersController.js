const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/UserCreateService');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

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
