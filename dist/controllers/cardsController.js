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
import * as cardsServices from "../services/cardsServices.js";
export function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, employeeId, type, insertCard;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, employeeId = _a.employeeId, type = _a.type;
                    return [4 /*yield*/, cardsServices.createCard(employeeId, type)];
                case 1:
                    insertCard = _b.sent();
                    res.status(201).send({ cvc: insertCard });
                    return [2 /*return*/];
            }
        });
    });
}
export function activateCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, securityCode, password;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, cardId = _a.cardId, securityCode = _a.securityCode, password = _a.password;
                    return [4 /*yield*/, cardsServices.activateCard(cardId, securityCode, password)];
                case 1:
                    _b.sent();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    });
}
export function balancesAndTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, transactions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardId = parseInt(req.params.id);
                    return [4 /*yield*/, cardsServices.getTransactionsCard(cardId)];
                case 1:
                    transactions = _a.sent();
                    return [2 /*return*/, res.status(200).send(transactions)];
            }
        });
    });
}
export function blockCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardId = parseInt(req.params.id);
                    password = req.body.password;
                    return [4 /*yield*/, cardsServices.blockCard(cardId, password)];
                case 1:
                    _a.sent();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    });
}
export function unlockCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardId = parseInt(req.params.id);
                    password = req.body.password;
                    return [4 /*yield*/, cardsServices.unlockCard(cardId, password)];
                case 1:
                    _a.sent();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    });
}
