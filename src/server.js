import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import autenticarRotas from "./Routes/AutenticarRotas.js";
import tarefasRotas from "./Routes/TarefasRotas.js";







dotenv.config()


const server = express().use(cors());
server.use(express.json())


server.use(autenticarRotas)
server.use(tarefasRotas)



const PORTA = process.env.PORTA || 4002;

server.listen(PORTA, () => {
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});