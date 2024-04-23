import { cadastrarTarefas, deletarTarefa, encontrarTarefas, tarefasId } from "../Controller/Tarefas.js";
import { Router } from "express";
import { tarefaSchema } from "../Schema/TarefasSchema.js";
import { validarDados } from '../Middleware/ValidarDados.js';
import { validarToken } from "../Middleware/ValidarToken.js";

const tarefasRotas = Router()

tarefasRotas.post("/cadastrarTarefas",validarToken,validarDados(tarefaSchema),cadastrarTarefas)

tarefasRotas.get("/todasTarefas", validarToken, encontrarTarefas)

tarefasRotas.get("/minhasTarefas/:id", validarToken, tarefasId)

tarefasRotas.delete("/deletarTarefas/:id", validarToken, deletarTarefa)

export default tarefasRotas