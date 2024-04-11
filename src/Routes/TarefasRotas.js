import { cadastrarTarefas, encontrarTarefas, tarefasId } from "../Controller/Tarefas.js";
import { Router } from "express";

const tarefasRotas = Router()

tarefasRotas.post("/cadastrarTarefas",cadastrarTarefas)

tarefasRotas.get("/todasTarefas",encontrarTarefas)

tarefasRotas.get("/minhasTarefas/:id",tarefasId)

export default tarefasRotas