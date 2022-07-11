import joi from "joi";
var paymentSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().pattern(/[0-9]$/).min(4).max(4).required(),
    businessId: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required()
});
export default paymentSchema;
