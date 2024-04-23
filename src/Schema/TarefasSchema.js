import joi from "joi";

export const tarefaSchema = joi.object({
    titulo: joi.string().required(),
    descricao:joi.string().required(),
})