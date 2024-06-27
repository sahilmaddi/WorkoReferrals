const { user } = require('../models');

class UserDao {
  async createUser(user) {
      const newUser = new User(user);
      return await newUser.save();
  }

  async getUserById(userId) {
      return await User.findById(userId);
  }

  async getAllUsers() {
      return await User.find({ isDeleted: false });
  }

  async updateUser(userId, userData) {
      return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId) {
      return await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
  }
}

module.exports = new UserDao();