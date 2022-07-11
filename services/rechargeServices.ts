import * as cardUtils from "../utils/cardUtils.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCard(cardId: number, amount: number) {
    const card = await cardUtils.checkExistingCard(cardId);
    await cardUtils.verifyCardIsBlocked(card.isBlocked);
    await cardUtils.checkExpirationCard(card.expirationDate);
    await rechargeRepository.insert({ cardId, amount });
}