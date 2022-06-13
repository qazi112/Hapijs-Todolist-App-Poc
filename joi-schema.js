const Joi = require("joi")

const userTypeSchema = Joi.object().keys({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().max(12).min(6).required()
})

module.exports = {userTypeSchema}