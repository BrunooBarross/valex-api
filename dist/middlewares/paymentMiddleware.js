import paymentSchema from "../schemas/paymentSchema.js";
export function validateDataPayment(req, res, next) {
    var error = paymentSchema.validate(req.body).error;
    if (error) {
        throw { type: "unprocessable_entity", message: error.details[0].message };
    }
    next();
}
