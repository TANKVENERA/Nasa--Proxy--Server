const useCase = require('../useCases/meteorsUseCase');
const express = require('express');
const router = express.Router();
const NasaProxyException = require('../middleware/exceptions/nasaProxyException');
const ValidationException = require("../middleware/exceptions/validationException");
const requestParamsValidator = require('../middleware/validators/requestParamsValidator');

/**
 * Get meteors
 * @param {string} dateFrom: start date
 * @param {string} dateTo: end date
 * @param {boolean} isTotalAmountRequired: Whether to show total meteors amount within given period
 * @param {boolean} wereDangerousMeteorsRequired: Whether dangerous meteors were seen within given period
 *
 * @returns meteors: list of meteors
 */
router.get('/meteors', async (req, res, next) => {
    try {
        const dateFrom = req.query.dateFrom;
        const dateTo = req.query.dateTo;
        const isTotalAmountRequired = req.query.isTotalAmountRequired;
        const wereDangerousMeteorsRequired = req.query.wereDangerousMeteorsRequired;
        requestParamsValidator.validate(dateFrom, dateTo, isTotalAmountRequired, wereDangerousMeteorsRequired)

        const meteorsData = await useCase.getMeteors(isTotalAmountRequired, wereDangerousMeteorsRequired, dateFrom, dateTo);

        res.render('../views/meteorsView.html', {meteorsData, dateFrom, dateTo});
    }
    catch (err) {
        if (err instanceof ValidationException) {
            next(new NasaProxyException(err.code, `Validation error: ${err.message}`))
        }
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`));
    }
});

module.exports = router;