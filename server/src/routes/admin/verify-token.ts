import { Router, Request, Response } from "express";
import { tokenValidator } from "../../utils/tokenValidation.js";
import { sendError } from "../../utils/apiError.js";

const router = Router();

router.get("/token", async (req: Request, res: Response) => {
  try {
    const rawToken = req.query.token;
    const typeOfToken = req.query.type;
    if (typeof rawToken !== "string") {
      throw Error;
    }

    if (typeof typeOfToken !== "string") {
      throw Error;
    }

    const ok = await tokenValidator(rawToken, typeOfToken);
    if (!ok) {
      throw Error;
    }

    res.json({ validToken: true });
  } catch {
    sendError(res, 401, "UNAUTHORIZED", "Token doesn't Exist or is Expired");
  }
});

export default router;
