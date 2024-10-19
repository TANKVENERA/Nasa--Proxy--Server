const useCase = require("../useCases/photoUseCase");
const express = require("express");
const NasaProxyError = require("../middleware/exceptions/nasaProxyError");
const validator = require("../middleware/validators/schemaValidator");
const userDataSchema = require("../middleware/validators/userDataSchema");

const router = express.Router();

/**
 * Get photo from the rover
 * @bodyParam {string} userId: user id
 * @bodyParam {string} userName: user name
 *
 * @returns photo: latest photo from the rover
 */
router.post(
  "/latestPhoto",
  validator.validate(userDataSchema, "body"),
  async (req, res, next) => {
    try {
      const latestPhoto = await useCase.getLatestPhoto();

      res.status(201).render("../views/photoView.html", { latestPhoto });
    } catch (err) {
      next(new NasaProxyError(err.status, `Downstream error: ${err.message}`));
    }
  },
);

module.exports = router;
