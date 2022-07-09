import { Request, Response } from "express";
import * as cardsServices from "../services/cardsServices.js"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } = req.body;
    const create = await cardsServices.createCard(employeeId, type);
    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response){
    const { cardId, securityCode, password } = req.body;
    await cardsServices.activateCard(cardId, securityCode, password);
    res.sendStatus(200);
}