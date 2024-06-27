const Joi = require('joi');

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required(),
  });

  return schema.validate(user);
}

function validateUserId(params) {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  return schema.validate(params);
}

module.exports = {
  validateUser,
  validateUserId,
};