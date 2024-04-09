import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config()

const server = express().use(cors());
server.use(express.json())
const PORTA = 4001;





const usuarios = [
    { nome: "marcos", email: 'marcos@marcos', senha: 123 }
]

const todasTarefas = [
    { id: 1, nomeTarefa: "criar blog", data: '02/03/2024' },
    { id: 1, nomeTarefa: "criar landing pages", data: '02/07/2024' },
    { id: 2, nomeTarefa: "criar video", data: '02/07/2024' },
]


server.post("/cadastrar", async (req, res) => {
    const usuario = req.body

    try {
        const cadastro = await usuarios.find(obj => obj.email === usuario.email)

        if (!usuario.nome || !usuario.email || !usuario.senha) {
            return res.status(422).send('Preencha os campos corretamente')
        }

        if (cadastro) return res.status(404).send('Usuario já cadastrado')

        usuarios.push(usuario)
        res.status(201).send('Usuario cadastrado com sucesso.')


    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
})

// ----------------------------------------------------------------------------

server.post("/login", async (req, res) => {
    const usuario = req.body

    try {
        if (!usuario.email || !usuario.senha) {
            return res.status(422).send('Preencha os campos corretamente')
        }

        const login = await usuarios.find(obj => obj.email == usuario.email && obj.senha == usuario.senha)

        if (!login) return res.status(404).send('Usuario não encontrado')

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


server.listen(PORTA, () => {
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});
