import ControllerTarefas from "../Controller/ControllerTarefas.js";
import { Router } from "express";
import { tarefaSchema } from "../Schema/TarefasSchema.js";
import { validarDados } from '../Middleware/ValidarDados.js';
import { validarToken } from "../Middleware/ValidarToken.js";

const tarefasRotas = Router()

tarefasRotas.post("/cadastrarTarefas",validarToken,validarDados(tarefaSchema), ControllerTarefas.cadastrarTarefas)

tarefasRotas.get("/todasTarefas", validarToken, ControllerTarefas.encontrarTarefas)

tarefasRotas.get("/minhasTarefas/:id", validarToken, ControllerTarefas.tarefasId)

tarefasRotas.delete("/deletarTarefas/:id", validarToken, ControllerTarefas.deletarTarefa)

tarefasRotas.put("/checkTarefas/:id", validarToken, ControllerTarefas.checkTarefas)

tarefasRotas.put("/unCheckTarefas/:id", validarToken, ControllerTarefas.unCheckTarefas)


export default tarefasRotas