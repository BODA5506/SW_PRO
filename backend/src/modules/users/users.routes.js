import { Router } from "express";
import { registerOrSelectRole, upsertSellerProfile } from "./users.controller.js";

const router = Router();

router.post("/session", registerOrSelectRole);
router.put("/:userId/seller-profile", upsertSellerProfile);

export default router;
