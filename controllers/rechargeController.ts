import { Request, Response } from "express";
import * as rechargeServices from "../services/rechargeServices.js"

export async function rechargeCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    const { amount } = req.body;
    await rechargeServices.rechargeCard(cardId, amount);
    res.sendStatus(200);
}