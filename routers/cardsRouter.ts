import { Router } from "express";
import { validateApiKey } from "../middlewares/apiKeyMiddleare.js";
import { validateActivationCard, validateCard } from "../middlewares/cardMiddleware.js";
import { activateCard, createCard } from "../controllers/cardsControlle.js";

const cardsRouter = Router();

cardsRouter.post('/cards', validateCard, validateApiKey, createCard);
cardsRouter.put('/cards', validateActivationCard, activateCard);

export default cardsRouter;