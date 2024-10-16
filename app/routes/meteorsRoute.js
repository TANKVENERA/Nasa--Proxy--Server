const useCase = require('../useCases/meteorsUseCase')
const express = require('express');
const router = express.Router();
const NasaProxyException = require('../middleware/errorHandler/nasaProxyException')
const util = require('../util/util')
const parseDates = util.parseDates
const parseStringToBoolean = util.parseStringToBoolean

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
        const parsedDates = parseDates(req.query.dateFrom, req.query.dateTo)
        const dateFrom = parsedDates.dateFrom
        const dateTo = parsedDates.dateTo
        const isTotalAmountRequired = parseStringToBoolean(req.query.isTotalAmountRequired)
        const wereDangerousMeteorsRequired = parseStringToBoolean(req.query.wereDangerousMeteorsRequired)

        const meteorsData = await useCase.getMeteors(isTotalAmountRequired, wereDangerousMeteorsRequired, dateFrom, dateTo)

        res.render('../views/meteorsView.html', {meteorsData, dateFrom, dateTo})
    }
    catch (err) {
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`))
    }
});

module.exports = router;