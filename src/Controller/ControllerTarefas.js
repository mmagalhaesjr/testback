import db from '../DataBase/db.js'
import TarefasServices from '../Services/TarefasServices.js';


async function cadastrarTarefas(req, res) {
    const tarefa = req.body;
    const { authorization } = req.headers;


    try {
        await TarefasServices.cadastrarTarefa(tarefa, authorization)
        return res.status(201).send('Tarefa Cadastrada!');

    } catch (error) {
       
        if (error.message === 'Token inválido') {
            return res.status(401).send(error.message);
        }
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}


async function encontrarTarefas(req, res) {
    const { authorization } = req.headers;
   
    try {
        const todasTarefas = await TarefasServices.encontrarTarefas(authorization);
        return res.status(200).send(todasTarefas.rows);

    } catch (error) {
        if (error.message === 'Token inválido') {
            return res.status(401).send(error.message);

        }else if(error.message === 'Não há tarefas cadastradas'){
            return res.status(404).send(error.message);
        }
        return res.status(500).send('Erro no servidor');
    }
}


async function tarefasId(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    try {
        const tarefasUsuario = await TarefasServices.tarefasId(id, authorization);
        return res.status(200).send(tarefasUsuario.rows);

    } catch (error) {
            if (error.message === 'Token inválido') {
                return res.status(401).send(error.message);

            } else if (error.message === 'Não há tarefas cadastradas para este usuário') {
                return res.status(404).send(error.message);
            }
        }

        return res.status(500).send('Erro no servidor');
    }


async function deletarTarefa(req, res) {
        const { id } = req.params; // ID da tarefa a ser excluída
        const { authorization } = req.headers;
    
        try {
            await TarefasServices.deletarTarefa(id, authorization);
            return res.status(200).send('Tarefa excluída com sucesso');

        } catch (error) {
            if (error.message === 'Token inválido') {
                return res.status(401).send(error.message);

            } else if (error.message === 'A tarefa não pertence a este usuário') {
                return res.status(404).send(error.message);

            } else {
                return res.status(500).send('Erro interno do servidor');
            }
        }
    }

 async function checkTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    
    try {
        await TarefasServices.checkTarefas(id, authorization);
        return res.status(200).send('Tarefa concluida');
    } 
    catch (error) {
        if (error.message === 'Token inválido') {
            return res.status(401).send(error.message);

        } else if (error.message === 'A tarefa não pertence a este usuário') {
            return res.status(404).send(error.message);

        } else {
            return res.status(500).send('Erro interno do servidor');
        }
    }
    
}

 async function unCheckTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    try {
        await TarefasServices.unCheckTarefas(id, authorization);
        return res.status(200).send('Tarefa ativa');
    } 
    catch (error) {
        if (error.message === 'Token inválido') {
            return res.status(401).send(error.message);

        } else if (error.message === 'A tarefa não pertence a este usuário') {
            return res.status(404).send(error.message);

        } else {
            return res.status(500).send('Erro interno do servidor');
        }
    }

  
}

export default{
    cadastrarTarefas,
    encontrarTarefas,
    tarefasId,
    deletarTarefa,
    checkTarefas,
    unCheckTarefas
}

