import joi from "joi";

const cardSchema = joi.object({
    employeeId: joi.number().integer().required(),
    type: joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

export { cardSchema };