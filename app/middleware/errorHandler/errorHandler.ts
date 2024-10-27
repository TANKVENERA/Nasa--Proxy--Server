import type { Response, NextFunction } from "express";
import { NasaProxyError } from "../exceptions/nasaProxyError.js";
import { ValidationError } from "../exceptions/validationError.js";

function errorHandler(err: Error, req: any, res: Response, next: NextFunction) {
  console.error(err.stack);

  if (err instanceof NasaProxyError || err instanceof ValidationError)
    res.status(err.code).json({
      error: err.message,
      code: err.code,
    });
  else {
    next(err);
  }
}

export { errorHandler };
