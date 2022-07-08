import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import { TransactionTypes } from "../repositories/cardRepository.js"

export async function createCard(employeeId: number, type: TransactionTypes) {
    await checkExistingEmployee(employeeId);
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