import { NextFunction, Request, Response } from "express";
import { cardSchema } from "../schemas/cardSchema.js";

export default function validateCard(req: Request, res: Response, next: NextFunction) {
    const { error } = cardSchema.validate(req.body);

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}