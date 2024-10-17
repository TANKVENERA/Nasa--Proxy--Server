const useCase = require('../useCases/photoUseCase');
const express = require('express');
const bodyParser = require('body-parser');
const NasaProxyException = require("../middleware/exceptions/nasaProxyException");
const ValidationException = require("../middleware/exceptions/validationException");
const userDataValidator = require('../middleware/validators/userDataValidator');
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
        const userData = req.body;
        userDataValidator.validate(userData)
        const userId = userData.userId;
        const userName = userData.userName;

        const latestPhoto = await useCase.getLatestPhoto();
        res.json(latestPhoto)
    } catch (err) {
        if (err instanceof ValidationException) {
            next(new NasaProxyException(err.code, `Validation error: ${err.message}`))
        }
        next(new NasaProxyException(err.status, `Downstream error: ${err.message}`))
    }
})

module.exports = router