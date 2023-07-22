const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password:Joi.string().min(6).required(),
})

const authSchemas = {
    registerSchema,
}

module.exports = authSchemas;