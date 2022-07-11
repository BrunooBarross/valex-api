import { NextFunction, Request, Response } from "express";
import paymentSchema from "../schemas/paymentSchema.js";

export function validateDataPayment(req: Request, res: Response, next: NextFunction) {
    const { error } = paymentSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}