import { Router } from "express";
import { payment } from "../controllers/paymentController.js";
import { validateDataPayment } from "../middlewares/paymentMiddleware.js";

const paymentRouter = Router();

paymentRouter.post('/cards/payment', validateDataPayment, payment);

export default paymentRouter;