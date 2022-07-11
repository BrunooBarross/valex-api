import { cardSchema, cardActivationSchema, lockUnlockCardSchema } from "../schemas/cardSchema.js";
export function validateCard(req, res, next) {
    var error = cardSchema.validate(req.body).error;
    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message };
    }
    next();
}
export function validateActivationCard(req, res, next) {
    var error = cardActivationSchema.validate(req.body).error;
    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message };
    }
    next();
}
export function validateManageStatusCard(req, res, next) {
    var cardId = parseInt(req.params.id);
    var password = req.body.password;
    var error = lockUnlockCardSchema.validate({ cardId: cardId, password: password }).error;
    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message };
    }
    next();
}
