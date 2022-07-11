import joi from "joi";
var rechargeSchema = joi.object({
    amount: joi.number().integer().min(1).required()
});
export default rechargeSchema;
