import joi from "joi";

 export const cadastroSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
})
