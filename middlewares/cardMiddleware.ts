import { NextFunction, Request, Response } from "express";
import { cardSchema, cardActivationSchema } from "../schemas/cardSchema.js";

export function validateCard(req: Request, res: Response, next: NextFunction) {
    const { error } = cardSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}

export function validateActivationCard(req: Request, res: Response, next: NextFunction){
    const { error } = cardActivationSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}