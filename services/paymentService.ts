import * as cardUtils from "../utils/cardUtils.js"
import * as businessReposiroty from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function makePayment(cardId: number, password: string, businessId: number, amount: number){
    const card = await cardUtils.checkExistingCard(cardId);
    await cardUtils.verifyCardIsBlocked(card.isBlocked);
    await cardUtils.checkExpirationCard(card.expirationDate);
    await cardUtils.validateCardPassword(password, card.password);
    await verifyAndValidateBusiness(businessId, card.type);
    await verifyCreditAmount(cardId, amount);
    paymentRepository.insert({ cardId, businessId, amount });
}

async function verifyAndValidateBusiness(businessId: number, cardType: string){
    const business = await businessReposiroty.findById(businessId);
    if(!business){
        throw { type: "unauthorized", message: "business not_Found" }
    }
    if(business.type !== cardType){
        throw { type: "conflict", message: "the company is not of the same type" }
    }
}

async function verifyCreditAmount(cardId: number, amount:number) {
    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = await cardUtils.generateBalance(transactions, recharges);

    if(amount > balance){
        throw { type: "unauthorized", message: "do not have enough credit for this payment" }
    }
}