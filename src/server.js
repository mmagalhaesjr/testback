import express from "express";
import cors from "cors";

import joi from "joi";
import bcrypt from 'bcrypt'


import dotenv from "dotenv";
dotenv.config()

const server = express().use(cors());
server.use(express.json())





const usuarios = [
    { nome: "marcos", email: 'marcos@marcos.com', senha: 123 }
]


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
        const cadastro = await usuarios.find(obj => obj.email == usuario.email)

        if (cadastro) return res.status(409).send('Usuario já cadastrado')
        
        usuarios.push(usuario)
        res.status(201).send('Usuario cadastrado com sucesso.')

       
console.log(usuarios)

    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
})

// ---------------------------------------------------------------------------- login

server.post("/login", async (req, res) => {
    const usuario = req.body

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

        
        const senhaCriptografada = bcrypt.compareSync(usuario.senha, usuarios.find(obj =>{ obj.senha}) )
        // const verificaSenha = usuarios.find(obj =>  obj.senha == senhaCriptografada )
        if (!senhaCriptografada) return res.status(404).send('Usuario não encontrado')

        res.status(200).send('Usuario entrou')

    } catch (error) {
        res.status(500).send('Erro no servidor')
    }

})

// ----------------------------------------------------------------------------

server.get("/todasTarefas", (req, res) => {
   
    try {
        return res.send(todasTarefas)
    } catch (error) {
        res.status(500).send('Erro no servidor')
    }

})

// ----------------------------------------------------------------------------

server.get("/minhasTarefas/:id", async (req, res) => {
    const { id } = req.params

    try {
        const tarefasUsuario = await todasTarefas.filter(obj => obj.id == id)
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