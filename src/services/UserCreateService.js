const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    if (!name || !email || !password)
      throw new AppError('Preencha todos os campos');

    const checkIfUserExists = await this.userRepository.findByEmail(email);

    if (checkIfUserExists) throw new AppError('Este e-mail já estar em uso!');

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

    return userCreated
  }
}

module.exports = UserCreateService