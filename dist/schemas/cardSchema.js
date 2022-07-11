import joi from "joi";
var cardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
var cardActivationSchema = joi.object({
    cardId: joi.number().required(),
    securityCode: joi.string().pattern(/[0-9]$/).min(3).max(3).required(),
    password: joi.string().pattern(/[0-9]$/).min(4).max(4).required()
});
var lockUnlockCardSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().pattern(/[0-9]$/).min(4).max(4).required()
});
export { cardSchema, cardActivationSchema, lockUnlockCardSchema };
