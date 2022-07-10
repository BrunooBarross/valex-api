import * as cardsServices from "../services/cardsServices.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCard(cardId: number, amount: number) {
    const card = await cardsServices.checkExistingCard(cardId);
    if (card.isBlocked) {
        throw { type: "unauthorized", message: "card already unlocked" }
    }
    await cardsServices.checkExpirationCard(card.expirationDate);
    await rechargeRepository.insert({ cardId, amount });
}