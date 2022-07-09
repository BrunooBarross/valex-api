import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import { TransactionTypes } from "../repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";

export async function createCard(employeeId: number, type: TransactionTypes) {
    await checkExistingEmployee(employeeId);
    await checkExistingCardType(employeeId, type);
    await generateDataCard(employeeId, type);
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

async function generateDataCard ( employeeId: number, type: TransactionTypes) {
   const cardNumber = generateCardNumber();
   const cardName = await generateHolderName(employeeId);
   const expirationCard = dayjs(Date.now()).add(5, "year").format("MM-YY");
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