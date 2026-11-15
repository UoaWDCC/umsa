import { Router, Response } from "express";
import AdminUser from "../../models/AdminUser.js";

const router = Router();

router.get("/", async (_req, res: Response) => {
  const admins = await AdminUser.find();

  return res.status(200).json(admins);
});

export default router;
