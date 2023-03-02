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
    // const currentDate = new Date.now();
    // console.log(currentDate);
    this.users = this.users.map((user) => {
      if (user.id === updatedUser.id) {
        user.name = updatedUser.name;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
      }
    });

    return {id: updatedUser.id}
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
