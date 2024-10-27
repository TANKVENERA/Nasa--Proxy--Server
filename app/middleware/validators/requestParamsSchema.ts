import Joi from "joi";
import moment from "moment";

const requestParamsSchema = Joi.object({
  dateFrom: Joi.string()
    .custom((date: string, helpers) => {
      if (!isDateFormatValid(date)) {
        return helpers.message({
          custom: `"dateFrom": "${date}" has wrong format. Valid format is: (YYYY-MM-DD)`,
        });
      }
      return date;
    })
    .optional(),

  dateTo: Joi.string()
    .custom((date: string, helpers) => {
      if (!isDateFormatValid(date)) {
        return helpers.message({
          custom: `"dateTo": "${date}" has wrong format. Valid format is: (YYYY-MM-DD)`,
        });
      }
      return date;
    })
    .optional(),

  isTotalAmountRequired: Joi.string()
    .custom((flag: string, helpers) => {
      if (!isBoolean(flag)) {
        return helpers.message({
          custom: `"isTotalAmountRequired": "${flag}" has wrong value. Valid values are true/false`,
        });
      }
      return flag;
    })
    .optional(),

  wereDangerousMeteorsRequired: Joi.string()
    .custom((flag: string, helpers) => {
      if (!isBoolean(flag)) {
        return helpers.message({
          custom: `"wereDangerousMeteorsRequired": "${flag}" has wrong value. Valid values are true/false`,
        });
      }
      return flag;
    })
    .optional(),
}).options({ abortEarly: false });

const isDateFormatValid = (date: string) => {
  return moment(date, "YYYY-MM-DD", true).isValid();
};

const isBoolean = (flag: string) => {
  return flag === "true" || flag === "false";
};

export { requestParamsSchema };
