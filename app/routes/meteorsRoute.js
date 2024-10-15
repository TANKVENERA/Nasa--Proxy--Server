const useCase = require('../useCases/meteorsUseCase')
const express = require('express');
const router = express.Router();
const NasaProxyException = require('../middleware/errorHandler/nasaProxyException')


/**
 * Get meteors
 * @param dateFrom: start date
 * @param dateTo: end date
 * @param isTotalAmountRequired: Whether to show total meteors amount within given period
 * @param wereDangerousMeteorsRequired: Whether dangerous meteors were seen within given period
 *
 * @returns meteors: list of meteors
 */
router.get('/meteors', async (req, res, next) => {
    try {
        const dateFrom = req.query.dateFrom
        const dateTo = req.query.dateTo
        const isTotalAmountRequired = req.query.isTotalAmountRequired;
        const wereDangerousMeteorsRequired = req.query.wereDangerousMeteorsRequired;

        res.json(await useCase.getMeteors(isTotalAmountRequired, wereDangerousMeteorsRequired, dateFrom, dateTo));
    }
    catch (err) {
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`))
    }
});

module.exports = router;