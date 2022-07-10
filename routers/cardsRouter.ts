import { Router } from "express";
import { validateApiKey } from "../middlewares/apiKeyMiddleare.js";
import { validateActivationCard, validateCard, validateManageStatusCard } from "../middlewares/cardMiddleware.js";
import { activateCard, balancesAndTransactions, blockCard, createCard, unlockCard } from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post('/cards', validateCard, validateApiKey, createCard);
cardsRouter.put('/cards', validateActivationCard, activateCard);
cardsRouter.get('/cards/:id', balancesAndTransactions);
cardsRouter.put('/cards/:id/block', validateManageStatusCard, blockCard);
cardsRouter.put('/cards/:id/unlock', validateManageStatusCard, unlockCard);

export default cardsRouter;