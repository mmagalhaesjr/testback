import express from "express";
import cors from "cors";

import joi from "joi";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';


import dotenv from "dotenv";
dotenv.config()

const server = express().use(cors());
server.use(express.json())





const usuarios = []


const todasTarefas = [
    { id: 1, nomeTarefa: "criar blog", data: '02/03/2024' },
    { id: 1, nomeTarefa: "criar landing pages", data: '02/07/2024' },
    { id: 2, nomeTarefa: "criar video", data: '02/07/2024' },
]


const tarefaSchema = joi.object({
    nomeTarefa:joi.string().required(),
    data:joi.date().required()
})
const validaTarefa = tarefaSchema.validate(tarefaSchema)

// ---------------------------------------------------------------------------- cadastro

server.post("/cadastrar", async (req, res) => {
    const usuario = req.body

    const usuarioSchema = joi.object({
        nome:joi.string().required(),
        email:joi.string().email().required(),
        senha:joi.string().required()
    })

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaCriptografada;
    
  

    const {error} = usuarioSchema.validate(usuario, { abortEarly: false });
    if (error) {
      const erros = error.details.map((obj) => {
            return obj.message
      })
      return res.status(422).send(erros)
    }
   
    try {
        const cadastro =  usuarios.find(obj => obj.email == usuario.email)

        if (cadastro) return res.status(409).send('Usuario já cadastrado')
        
        usuarios.push(usuario)
        res.status(201).send('Usuario cadastrado com sucesso.')


    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
})

// ---------------------------------------------------------------------------- login

server.post("/login", async (req, res) => {
    const usuario = req.body
    const token = uuidv4()

    const usuarioSchema = joi.object({
        email:joi.string().email().required(),
        senha:joi.string().required()
    })

    
    const {error} = usuarioSchema.validate(usuario, { abortEarly: false });
    if (error) {
      const erros = error.details.map((obj) => {
            return obj.message
      })
      return res.status(422).send(erros)
    }

    try {
    
        const verificaLogin =  usuarios.find(obj => obj.email === usuario.email)
        if (!verificaLogin) return res.status(404).send('Usuario não encontrado')

        
        const senhaCorreta = bcrypt.compareSync(usuario.senha, verificaLogin.senha )
        if (!senhaCorreta) return res.status(404).send('Usuario não encontrado')

        res.status(200).send(token)


    } catch (error) {
        res.status(500).send('Erro no servidor')
    }

})

// ----------------------------------------------------------------------------

server.get("/todasTarefas", (req, res) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send('Token de autorização não fornecido');
    }

    const token = authorization.replace("Bearer", " ");
    console.log(token);
   
    try {
        return res.send(usuarios);

    } catch (error) {
        res.status(500).send('Erro no servidor');
    }
});

// ----------------------------------------------------------------------------

server.get("/minhasTarefas/:id", async (req, res) => {
    const { id } = req.params

    try {
        const tarefasUsuario = todasTarefas.filter(obj => obj.id == id)
        if (tarefasUsuario.length === 0) return res.send('Tarefa de usuario não encontrada')

        return res.send(tarefasUsuario.reverse())
    } catch (error) {
        res.status(500).send('Erro no servidor')
    }


})


// ----------------------------------------------------------------------------


const PORTA = process.env.PORTA || 4002;

server.listen(PORTA, () => {
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});