import { NextFunction, Request, Response } from "express";
import { cardSchema, cardActivationSchema, lockUnlockCardSchema } from "../schemas/cardSchema.js";

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

export function validateManageStatusCard(req: Request, res: Response, next: NextFunction){
    const cardId = parseInt(req.params.id);
    const { password } = req.body;
    
    const { error } = lockUnlockCardSchema.validate({cardId, password});

    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message }
    }

    next();
}