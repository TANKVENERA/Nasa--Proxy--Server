const Joi = require('joi')
const ValidationException = require('../exceptions/validationException')

const validate = (userData) => {
    const JoiSchema = Joi.object({

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

    const validationResult = JoiSchema.validate(userData)

    if (validationResult.error) {

        throw new ValidationException(400, validationResult.error.details[0].message);
    }
}

module.exports = {validate}