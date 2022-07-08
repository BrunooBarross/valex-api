import { Router } from "express";
import { validateApiKey } from "../middlewares/apiKeyMiddleare.js";
import validateCard from "../middlewares/cardMiddleware.js";
import { createCard } from "../controllers/cardsControlle.js";

const cardsRouter = Router();

cardsRouter.post('/cards', validateCard, validateApiKey, createCard);

export default cardsRouter;