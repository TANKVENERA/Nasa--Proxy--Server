import type { NextFunction } from "express";
import { ValidationError } from "../exceptions/validationError.js";
import { ObjectSchema } from "joi";

const validate = (schema: ObjectSchema, property: string) => {
  return (req: any, res: any, next: NextFunction) => {
    const validationResult = schema.validate(req[property]);

    if (validationResult.error) {
      next(
        new ValidationError(
          400,
          `Validation Error: ${validationResult.error.details[0].message}`,
        ),
      );
    }
    next();
  };
};

export { validate };
