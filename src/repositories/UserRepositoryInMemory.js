// for test
class UserRepositoryInMemory {
  users = [];

  async create({ name, email, password }) {
    const user = {
      id: this.users.length + 1,
      name,
      email,
      password,
    };

    this.users.push(user);

    return { id: user.id };
  }

  async update(updatedUser) {
    this.users = this.users.map((user) => {
      if (user.id === updatedUser.id) {
        user = updatedUser;
      }
      return user;
    });

    return { id: updatedUser.id };
  }

  async findById(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return undefined;
    }

    return { ...user };
  }

  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return undefined;
    }

    return { ...user };
  }
}

module.exports = UserRepositoryInMemory;
