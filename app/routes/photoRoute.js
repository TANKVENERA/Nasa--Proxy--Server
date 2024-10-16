const useCase = require('../useCases/photoUseCase');
const express = require('express');
const bodyParser = require('body-parser');
const NasaProxyException = require("../middleware/errorHandler/nasaProxyException");
const router = express.Router();

/**
 * Get photo from the rover
 * @bodyParam {string} userId: user id
 * @bodyParam {string} userName: user name
 *
 * @returns photo: latest photo from the rover
 */
router.post('/latestPhoto', bodyParser.json(), async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const userName = req.body.userName;
        console.log('Validator to be added for:', userId, userName)

        const latestPhoto = await useCase.getLatestPhoto();
        res.json(latestPhoto)
    } catch (err) {
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`))
    }
})

module.exports = router