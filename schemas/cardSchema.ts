import joi from "joi";

const cardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    type: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required()
})

export { cardSchema };