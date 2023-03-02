// for test
class UserRepositoryInMemory {
  users = [];

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    };

    this.users.push(user);

    return { id: user.id };
  }

  async update(updatedUser) {
    const currentDate = new Date.now();
    console.log(updatedUser);
    this.users = this.users.map((user) => {
      if (user.id === updatedUser.id) {
        user.name = updatedUser.name;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
      }
    });
  }

  async findById(id) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

module.exports = UserRepositoryInMemory;
