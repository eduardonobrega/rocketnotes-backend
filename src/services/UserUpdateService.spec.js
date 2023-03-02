const UserCreateService = require('./UserCreateService');
const UserUpdateService = require('./UserUpdateService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe('UserUpdateService', () => {
  let userRepository = null;
  let userCreateService = null;
  let userUpdateService = null;
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
    userUpdateService = new UserUpdateService(userRepository);
  });

  it('user should be update', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123',
    };

    const { id: user_id } = await userCreateService.execute(user);

    const userUpdate = {
      id: user_id,
      name: ' Updated User Test',
      email: 'user@test.com',
      oldPassword: '123',
      newPassword: '456',
    };

    const updatedUser = await userUpdateService.execute(userUpdate);

    expect(updatedUser).toHaveProperty('id');
  });

  it('user not should be update with exists email', async () => {
    const user1 = {
      name: 'User Test 1',
      email: 'user@test1.com',
      password: '123',
    };
    const user2 = {
      name: 'User Test 2',
      email: 'user@test2.com',
      password: '456',
    };

    await userCreateService.execute(user1);
    const { id: user_id2 } = await userCreateService.execute(user2);

    const user2Update = {
      id: user_id2,
      name: 'User Test 2 update',
      email: 'user@test1.com', // mesmo email
      password: '789',
    };

    await expect(userUpdateService.execute(user2Update)).rejects.toEqual(
      new AppError('Email já está sendo usado!')
    );
  });

  it('user must inform old password to change', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123',
    };

    const { id: user_id } = await userCreateService.execute(user);

    const userUpdate = {
      id: user_id,
      name: ' Updated User Test',
      email: 'user.test@test.com',
      newPassword: '456',
    };

    await expect(userUpdateService.execute(userUpdate)).rejects.toEqual(
      new AppError(
        'Você precisa informar a senha antiga para definir a nova senha!'
      )
    );
  });

  it('password validation', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123',
    };

    const { id: user_id } = await userCreateService.execute(user);

    const userUpdate = {
      id: user_id,
      name: ' Updated User Test',
      email: 'user.test@test.com',
      oldPassword: '009',
      newPassword: '456',
    };

    await expect(userUpdateService.execute(userUpdate)).rejects.toEqual(
      new AppError('Senha antiga não confere!')
    );
  });
});
