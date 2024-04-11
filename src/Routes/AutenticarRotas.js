import { singup,login } from "../Controller/Autenticar.js"
import { Router } from "express";

const autenticarRotas = Router()

autenticarRotas.post("/singup",singup)

autenticarRotas.post("/login",login)

export default autenticarRotas