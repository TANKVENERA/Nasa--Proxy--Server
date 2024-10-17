const ValidationError = require("../exceptions/validationError");

const validate = (schema, property) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req[property])

        if (validationResult.error) {
            next(new ValidationError(400, `Validation Error: ${validationResult.error.details[0].message}`));
        }
        next()
    }
}

module.exports = {validate}