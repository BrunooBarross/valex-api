import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as cardUtils from "../utils/cardUtils.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import { TransactionTypes } from "../repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export async function createCard(employeeId: number, type: TransactionTypes) {
    await checkExistingEmployee(employeeId);
    await checkExistingCardType(employeeId, type);
    const {cardData, cvc} = await generateCardData(employeeId, type);
    await cardRepository.insert(cardData);
    return cvc;
}

async function checkExistingEmployee(employeeId: number) {
    const selectEmployee = await employeeRepository.findById(employeeId);
    if (!selectEmployee) {
        throw { type: "unauthorized", message: "there is no employee with this id" }
    }
}

async function checkExistingCardType(employeeId: number, type: TransactionTypes) {
    const checkExistingCardType = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
    if (checkExistingCardType) {
        throw { type: "conflict", message: `the employee already has the ${type} card` }
    }
}

async function generateCardData ( employeeId: number, type: TransactionTypes) {
    const cardNumber = generateCardNumber();
    const cardName = await generateHolderName(employeeId);
    const expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
    const {cvc, encryptCvc} = createEncriptedCVC();  
    const cardData = {
        employeeId,
        number: cardNumber,
        cardholderName:cardName,
        securityCode: encryptCvc,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    } 
    return { cardData, cvc };
}

function generateCardNumber() {
    return faker.finance.creditCardNumber('visa');
}

async function generateHolderName(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId);
    const name = employee.fullName.split(" ");
    const middle = new Array;

    for (let i = 1; i < name.length - 1; i++) {
        if (name[i].length > 3) {
            middle.push(name[i][0]);
        }
    }

    const convertedName = [name[0], middle, name[name.length - 1]];
    return convertedName.join(" ").toUpperCase();
}

function createEncriptedCVC(){
    const cvc = faker.finance.creditCardCVV();
    const encryptCvc = cryptr.encrypt(cvc)
    return {cvc, encryptCvc};
}

export async function activateCard(cardId: number, securityCode: string, password: string) {
    const card = await cardUtils.checkExistingCard(cardId);
    if(card.password){
        throw { type: "bad_Request", message: "card is already activated" }
    }
    await cardUtils.checkExpirationCard(card.expirationDate);
    await checkIsValidCVC(securityCode, card.securityCode);
    const encryptPassword = bcrypt.hashSync(password, 10);
    await cardRepository.update(cardId, { password: encryptPassword, isBlocked:false});
}

async function checkIsValidCVC(securityCode : string, encryptSecurityCode: string){
    const decryptCVC = cryptr.decrypt(encryptSecurityCode);
    if( decryptCVC != securityCode){
        throw { type: "unauthorized", message: "cvc incorrect" }
    }
}

export async function getTransactionsCard(cardId: number ){
    await cardUtils.checkExistingCard(cardId);
    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = await cardUtils.generateBalance(transactions, recharges);

    return { balance, transactions, recharges};
}

export async function blockCard(cardId: number, password: string){
    const card = await cardUtils.checkExistingCard(cardId);
    await cardUtils.verifyCardIsBlocked(card.isBlocked);
    await cardUtils.checkExpirationCard(card.expirationDate);
    await cardUtils.validateCardPassword(password, card.password);
    await cardRepository.update(cardId, { isBlocked: true});
}

export async function unlockCard(cardId: number, password: string){
    const card = await cardUtils.checkExistingCard(cardId);
    if (!card.isBlocked) {
        throw { type: "unauthorized", message: "card already unlocked" }
    }
    await cardUtils.checkExpirationCard(card.expirationDate);
    await cardUtils.validateCardPassword(password, card.password);
    await cardRepository.update(cardId, { isBlocked: false});
}