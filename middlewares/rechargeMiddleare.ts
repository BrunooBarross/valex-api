import { NextFunction, Request, Response } from "express";
import rechargeSchema from "../schemas/rechargeSchema.js";

export function validateRechargeCard(req: Request, res: Response, next: NextFunction) {
    const { error } = rechargeSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}