import { NextFunction, Request, Response } from "express";
import * as companyRepository from "../repositories/companyRepository.js"

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"].toString();
    const existingCompany = await companyRepository.findByApiKey(apiKey);
    
    if (!existingCompany) {
        throw { type: "unauthorized", message: "non-authorized api key" }
    }

    next();
}