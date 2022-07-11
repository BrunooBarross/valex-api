import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { validateApiKey } from "../middlewares/apiKeyMiddleare.js";
import { validateRechargeCard } from "../middlewares/rechargeMiddleare.js";
var rechargeRouter = Router();
rechargeRouter.post('/cards/:id/recharge', validateApiKey, validateRechargeCard, rechargeCard);
export default rechargeRouter;
