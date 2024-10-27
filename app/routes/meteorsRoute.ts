import express from "express";
import type { Request, Response } from "express";
import { getMeteors } from "../useCases/meteorsUseCase.js";
import { NasaProxyError } from "../middleware/exceptions/nasaProxyError.js";
import { validate } from "../middleware/validators/schemaValidator.js";
import { requestParamsSchema } from "../middleware/validators/requestParamsSchema.js";

const router = express.Router();

interface RequestQuery {
  dateFrom?: string;
  dateTo?: string;
  isTotalAmountRequired?: boolean;
  wereDangerousMeteorsRequired?: boolean;
}

/**
 * Get meteors
 * @param {string} dateFrom: start date
 * @param {string} dateTo: end date
 * @param {boolean} isTotalAmountRequired: Whether to show total meteors amount within given period
 * @param {boolean} wereDangerousMeteorsRequired: Whether dangerous meteors were seen within given period
 *
 * @returns meteors: list of meteors
 */
router.get(
  "/meteors",
  validate(requestParamsSchema, "query"),
  async (req: Request<any, any, any, RequestQuery>, res: Response, next) => {
    try {
      const dateFrom = req.query.dateFrom;
      const dateTo = req.query.dateTo;
      const isTotalAmountRequired = req.query.isTotalAmountRequired;
      const wereDangerousMeteorsRequired =
        req.query.wereDangerousMeteorsRequired;

      const meteorsData = await getMeteors(
        isTotalAmountRequired,
        wereDangerousMeteorsRequired,
        dateFrom,
        dateTo,
      );

      res.status(200).render("../views/meteorsView.html", { meteorsData });
    } catch (err: any) {
      next(
        new NasaProxyError(
          err.status as number,
          `Downstream error: ${err.message as string}`,
        ),
      );
    }
  },
);

export { router };
