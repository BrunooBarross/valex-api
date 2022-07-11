import rechargeSchema from "../schemas/rechargeSchema.js";
export function validateRechargeCard(req, res, next) {
    var error = rechargeSchema.validate(req.body).error;
    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message };
    }
    next();
}
