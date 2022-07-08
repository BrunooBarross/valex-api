import { Router } from "express";
import { validateApiKey } from "../middlewares/apiKeyMiddleare.js";
import validateCard from "../middlewares/cardMiddleware.js";

const cardsRouter = Router();

cardsRouter.post('/cards', validateCard, validateApiKey);

export default cardsRouter;