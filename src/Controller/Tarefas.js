

import { idUsuario, todasTarefas } from '../DataBase/db.js'
import db from '../DataBase/db.js'
import { tarefaSchema } from '../Schema/TarefasSchema.js'


export async function cadastrarTarefas(req, res) {
    const tarefa = req.body
    const { authorization } = req.headers

    const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer
    console.log(token)


   
    todasTarefas.push({ tarefa})

    try {
        const verificaToken = idUsuario.find(obj => obj.token === token);
        if (!verificaToken) {
            return res.status(401).send('Token inválido');
        }
        
        return res.send(todasTarefas);

    } catch (error) {
        res.status(500).send('Erro no servidor');

    }
}

export async function encontrarTarefas(req, res) {
    const { authorization } = req.headers

    const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer
    console.log(token)

    try {
        const verificaToken = idUsuario.find(obj => obj.token === token);
        if (!verificaToken) {
            return res.status(401).send('Token inválido');
        }

        return res.send(todasTarefas);


    } catch (error) {
        res.status(500).send('Erro no servidor');

    }
}

export async function tarefasId(req, res) {
    const { id } = req.params

    try {
        const tarefasUsuario = todasTarefas.filter(obj => obj.id == id)
        if (tarefasUsuario.length === 0) return res.send('Tarefa de usuario não encontrada')

        return res.send(tarefasUsuario.reverse())
    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
}


