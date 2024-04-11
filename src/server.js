import express from "express";
import cors from "cors";

import { singup,login } from "./Controller/Autenticar.js"
import { cadastrarTarefas, encontrarTarefas, tarefasId } from "./Controller/Tarefas.js";


import dotenv from "dotenv";


dotenv.config()



const server = express().use(cors());
server.use(express.json())



// =====================================================
server.post("/singup",singup)

server.post("/login",login)

// =====================================================

server.post("/cadastrarTarefas",cadastrarTarefas)

server.get("/todasTarefas",encontrarTarefas)

server.get("/minhasTarefas/:id",tarefasId)
// =====================================================


const PORTA = process.env.PORTA || 4002;

server.listen(PORTA, () => {
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});