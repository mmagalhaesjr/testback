import joi from "joi";

export const tarefaSchema = joi.object({
    tarefa: joi.string().required(),
})