import { Request, Response } from "express";
import * as cardsServices from "../services/cardsServices.js"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } = req.body;
    const create = cardsServices.createCard(employeeId, type);
    res.sendStatus(201);
}