var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
var cryptr = new Cryptr(process.env.CRYPTR_KEY);
export function createCard(employeeId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardData, cvc;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, checkExistingEmployee(employeeId)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, checkExistingCardType(employeeId, type)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, generateCardData(employeeId, type)];
                case 3:
                    _a = _b.sent(), cardData = _a.cardData, cvc = _a.cvc;
                    return [4 /*yield*/, cardRepository.insert(cardData)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, cvc];
            }
        });
    });
}
function checkExistingEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var selectEmployee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    selectEmployee = _a.sent();
                    if (!selectEmployee) {
                        throw { type: "unauthorized", message: "there is no employee with this id" };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function checkExistingCardType(employeeId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var checkExistingCardType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(type, employeeId)];
                case 1:
                    checkExistingCardType = _a.sent();
                    if (checkExistingCardType) {
                        throw { type: "conflict", message: "the employee already has the ".concat(type, " card") };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function generateCardData(employeeId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var cardNumber, cardName, expirationDate, _a, cvc, encryptCvc, cardData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cardNumber = generateCardNumber();
                    return [4 /*yield*/, generateHolderName(employeeId)];
                case 1:
                    cardName = _b.sent();
                    expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
                    _a = createEncriptedCVC(), cvc = _a.cvc, encryptCvc = _a.encryptCvc;
                    cardData = {
                        employeeId: employeeId,
                        number: cardNumber,
                        cardholderName: cardName,
                        securityCode: encryptCvc,
                        expirationDate: expirationDate,
                        password: null,
                        isVirtual: false,
                        originalCardId: null,
                        isBlocked: true,
                        type: type
                    };
                    return [2 /*return*/, { cardData: cardData, cvc: cvc }];
            }
        });
    });
}
function generateCardNumber() {
    return faker.finance.creditCardNumber('visa');
}
function generateHolderName(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, name, middle, i, convertedName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    employee = _a.sent();
                    name = employee.fullName.split(" ");
                    middle = new Array;
                    for (i = 1; i < name.length - 1; i++) {
                        if (name[i].length > 3) {
                            middle.push(name[i][0]);
                        }
                    }
                    convertedName = [name[0], middle, name[name.length - 1]];
                    return [2 /*return*/, convertedName.join(" ").toUpperCase()];
            }
        });
    });
}
function createEncriptedCVC() {
    var cvc = faker.finance.creditCardCVV();
    var encryptCvc = cryptr.encrypt(cvc);
    return { cvc: cvc, encryptCvc: encryptCvc };
}
export function activateCard(cardId, securityCode, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, encryptPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkExistingCard(cardId)];
                case 1:
                    card = _a.sent();
                    if (card.password) {
                        throw { type: "bad_Request", message: "card is already activated" };
                    }
                    return [4 /*yield*/, cardUtils.checkExpirationCard(card.expirationDate)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, checkIsValidCVC(securityCode, card.securityCode)];
                case 3:
                    _a.sent();
                    encryptPassword = bcrypt.hashSync(password, 10);
                    return [4 /*yield*/, cardRepository.update(cardId, { password: encryptPassword, isBlocked: false })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function checkIsValidCVC(securityCode, encryptSecurityCode) {
    return __awaiter(this, void 0, void 0, function () {
        var decryptCVC;
        return __generator(this, function (_a) {
            decryptCVC = cryptr.decrypt(encryptSecurityCode);
            if (decryptCVC != securityCode) {
                throw { type: "unauthorized", message: "cvc incorrect" };
            }
            return [2 /*return*/];
        });
    });
}
export function getTransactionsCard(cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var transactions, recharges, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkExistingCard(cardId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, paymentRepository.findByCardId(cardId)];
                case 2:
                    transactions = _a.sent();
                    return [4 /*yield*/, rechargeRepository.findByCardId(cardId)];
                case 3:
                    recharges = _a.sent();
                    return [4 /*yield*/, cardUtils.generateBalance(transactions, recharges)];
                case 4:
                    balance = _a.sent();
                    return [2 /*return*/, { balance: balance, transactions: transactions, recharges: recharges }];
            }
        });
    });
}
export function blockCard(cardId, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkExistingCard(cardId)];
                case 1:
                    card = _a.sent();
                    return [4 /*yield*/, cardUtils.verifyCardIsBlocked(card.isBlocked)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.checkExpirationCard(card.expirationDate)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.validateCardPassword(password, card.password)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, cardRepository.update(cardId, { isBlocked: true })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function unlockCard(cardId, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkExistingCard(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card.isBlocked) {
                        throw { type: "unauthorized", message: "card already unlocked" };
                    }
                    return [4 /*yield*/, cardUtils.checkExpirationCard(card.expirationDate)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.validateCardPassword(password, card.password)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, cardRepository.update(cardId, { isBlocked: false })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
