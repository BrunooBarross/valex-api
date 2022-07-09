import joi from "joi";

const cardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
});

const cardActivationSchema = joi.object({
    cardId: joi.number().required(),
    securityCode: joi.string().pattern(/[0-9]$/).min(3).max(3).required(),
    password: joi.string().pattern(/[0-9]$/).min(4).max(4).required()
});

export { cardSchema, cardActivationSchema };