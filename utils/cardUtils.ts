import * as cardRepository from "../repositories/cardRepository.js"
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function checkExistingCard(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw { type: "not_Found", message: "no-existent card" }
    }
    return card;
}

export async function checkExpirationCard(expirationDate: string){
    const isExpired = dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
    if(isExpired){
        throw { type: "forbidden", message: "expired card" }
    }
}

export async function validateCardPassword(password: string, encryptedPassword: string){
    const isValidPassword = bcrypt.compareSync(password, encryptedPassword);
    if (!isValidPassword) {
        throw { type: "unauthorized", message: "password incorrect" }
    }
}

export async function generateBalance(transactions: any, recharges: any){
    let paymentsTotal = 0;
    let rechargeTotal= 0;
    
    transactions.forEach(item => {
        paymentsTotal += item.amount;
    });

    recharges.forEach(item => {
        rechargeTotal += item.amount;
    });

    const result = rechargeTotal - paymentsTotal;
    return result;
}