const useCase = require("../useCases/meteorsUseCase");
const express = require("express");
const router = express.Router();
const NasaProxyError = require("../middleware/exceptions/nasaProxyError");
const validator = require("../middleware/validators/schemaValidator");
const requestParamsSchema = require("../middleware/validators/requestParamsSchema");

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
  validator.validate(requestParamsSchema, "query"),
  async (req, res, next) => {
    try {
      const dateFrom = req.query.dateFrom;
      const dateTo = req.query.dateTo;
      const isTotalAmountRequired = req.query.isTotalAmountRequired;
      const wereDangerousMeteorsRequired =
        req.query.wereDangerousMeteorsRequired;

      const meteorsData = await useCase.getMeteors(
        isTotalAmountRequired,
        wereDangerousMeteorsRequired,
        dateFrom,
        dateTo,
      );

      res
        .status(200)
        .render("../views/meteorsView.html", { meteorsData, dateFrom, dateTo });
    } catch (err) {
      next(new NasaProxyError(err.status, `Downstream error: ${err.message}`));
    }
  },
);

module.exports = router;
