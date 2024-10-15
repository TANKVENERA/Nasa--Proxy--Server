const useCase = require('../useCases/meteorsUseCase')
const express = require('express');
const router = express.Router();
const NasaProxyException = require('../middleware/errorHandler/nasaProxyException')


/**
 * Get meteors

 * @returns meteors: list of meteors
 */
router.get('/meteors', async (req, res, next) => {
    try {
        res.json(await useCase.getMeteors());
    }
    catch (err) {
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`))
    }
});

module.exports = router;