const Joi = require('joi')
const ValidationException = require('../exceptions/validationException')
const moment = require('moment')

const validate = (dateFrom, dateTo, isTotalAmountRequired, wereDangerousMeteorsRequired) => {
    const JoiSchema = Joi.object({

        dateFrom: Joi.string()
            .custom((date, helpers) => {
                if (!isDateFormatValid(date)) {
                    return helpers.message({
                        custom: `"dateFrom": "${date}" has wrong format. Valid format is: (YYYY-MM-DD)`
                    });
                }
                return date;
            })
            .optional(),

        dateTo: Joi.string()
            .custom((date, helpers) => {
                if (!isDateFormatValid(date)) {
                    return helpers.message({
                        custom: `"dateTo": "${date}" has wrong format. Valid format is: (YYYY-MM-DD)`
                    });
                }
                return date;
            })
            .optional(),

        isTotalAmountRequired: Joi.string()
            .custom((flag, helpers) => {
                if (!isBoolean(flag)) {
                    return helpers.message({
                        custom: `"isTotalAmountRequired": "${flag}" has wrong value. Valid values are true/false`
                    });
                }
                return flag;
            })
            .optional(),

        wereDangerousMeteorsRequired: Joi.string()
            .custom((flag, helpers) => {
                if (!isBoolean(flag)) {
                    return helpers.message({
                        custom: `"wereDangerousMeteorsRequired": "${flag}" has wrong value. Valid values are true/false`
                    });
                }
                return flag;
            })
            .optional(),

    }).options({abortEarly: false});

    const validationResult = JoiSchema.validate({
        dateFrom: dateFrom,
        dateTo: dateTo,
        isTotalAmountRequired: isTotalAmountRequired,
        wereDangerousMeteorsRequired: wereDangerousMeteorsRequired
    })

    if (validationResult.error) {

        throw new ValidationException(400, validationResult.error.details[0].message);
    }
}

const isDateFormatValid = (date) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
}

const isBoolean = (flag) => {
    return flag === "true" ||  flag === "false";
}


module.exports = {validate}