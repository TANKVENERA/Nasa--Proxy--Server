import express from "express";
import type { Request, Response } from "express";
import { getLatestPhoto } from "../useCases/photoUseCase.js";
import { NasaProxyError } from "../middleware/exceptions/nasaProxyError.js";
import { validate } from "../middleware/validators/schemaValidator.js";
import { userDataSchema } from "../middleware/validators/userDataSchema.js";

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
  validate(userDataSchema, "body"),
  async (req: Request, res: Response, next) => {
    try {
      const latestPhoto: string = await getLatestPhoto();

      res.status(201).render("../views/photoView.html", { latestPhoto });
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
