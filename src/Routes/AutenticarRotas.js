import { singup,login } from "../Controller/Autenticar.js"
import { Router } from "express";

import { validarDados } from "../Middleware/ValidarDados.js";
import { cadastroSchema, loginSchema } from "../Schema/AutenticarSchema.js";


const autenticarRotas = Router()

autenticarRotas.post("/singup", validarDados(cadastroSchema),singup)
autenticarRotas.post("/login",validarDados(loginSchema), login)
//(validarDados) é a minhafunção do arquivo middleware q vai indentificar qual schema vai ser usado

export default autenticarRotas