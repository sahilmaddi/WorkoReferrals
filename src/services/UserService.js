const userDao = require('../dao/UserDao');
const Joi = require('joi');

class UserService {
    validateUser(user) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            age: Joi.number().required(),
            city: Joi.string().required(),
            zipCode: Joi.string().required()
        });
        return schema.validate(user);
    }

    async createUser(user) {
        const { error } = this.validateUser(user);
        if (error) throw new Error(error.details[0].message);
        return await userDao.createUser(user);
    }

    async getUserById(userId) {
        return await userDao.getUserById(userId);
    }

    async getAllUsers() {
        return await userDao.getAllUsers();
    }

    async updateUser(userId, userData) {
        const { error } = this.validateUser(userData);
        if (error) throw new Error(error.details[0].message);
        return await userDao.updateUser(userId, userData);
    }

    async deleteUser(userId) {
        return await userDao.deleteUser(userId);
    }
}

module.exports = new UserService();