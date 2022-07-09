import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
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
    const cardData = await generateCardData(employeeId, type);
    await cardRepository.insert(cardData);
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
    const cvc = createEncriptedCVC();  
    const cardData = {
        employeeId,
        number: cardNumber,
        cardholderName:cardName,
        securityCode: cvc,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    } 
    return cardData;
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
    return cryptr.encrypt(cvc);
}

export async function activateCard(cardId: number, securityCode: string, password: string) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw { type: "unauthorized", message: "no-existent card" }
    }
    if(card.password){
        throw { type: "bad_Request", message: "card is already activated" }
    }
    await checkExpirationCard(card.expirationDate);
    await checkIsValidCVC(securityCode, card.securityCode);
    const encryptPassword = bcrypt.hashSync(password, 10);
    await cardRepository.update(cardId, { password: encryptPassword });
}

async function checkExpirationCard(expirationDate: string){
    const isExpired = dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
    if(isExpired){
        throw { type: "forbidden", message: "expired card" }
    }
}

async function checkIsValidCVC(securityCode : string, encryptSecurityCode: string){
    const decryptCVC = cryptr.decrypt(encryptSecurityCode);
    if( decryptCVC != securityCode){
        throw { type: "unauthorized", message: "cvc incorrect" }
    }
}