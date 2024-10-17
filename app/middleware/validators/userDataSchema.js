const Joi = require('joi')

const userDataSchema = Joi.object({
    userId: Joi.number()
        .integer()
        .min(1)
        .max(999)
        .required(),

    userName: Joi.string()
        .min(4)
        .max(15)
        .required()

}).options({abortEarly: false});

module.exports = userDataSchema