import * as cardRepository from "../repositories/cardRepository.js"
import dayjs from "dayjs";

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