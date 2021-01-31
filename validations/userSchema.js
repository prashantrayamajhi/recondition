const Joi = require('joi')

module.exports.userDataSchema = Joi.object({
  name: Joi.string().min(5).required().strict(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required().strict(),
  phone: Joi.string().min(10).required().strict(),
  address: Joi.string().required().strict(),
})
