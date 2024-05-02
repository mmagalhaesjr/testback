import db from '../DataBase/db.js'
import TarefaRepositories from '../Repositories/TarefaRepositories.js';



async function cadastrarTarefa(tarefa, authorization) {
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

        const tokenBd = await TarefaRepositories.verificaToken(token);
        if (tokenBd.rows.length === 0) {
            throw new Error('Token inválido');
        }

        await TarefaRepositories.cadastrarTarefa(tarefa, tokenBd);
}

async function encontrarTarefas(authorization) {

        if (!authorization) throw new Error('Token não fornecido');
        const token = authorization.replace("Bearer ", ""); // tem que ter um espaço apos o Bearer
        const tokenBd = await TarefaRepositories.verificaToken(token);
        if (tokenBd.rows.length === 0) throw new Error('Token inválido');
    
        const todasTarefas = await TarefaRepositories.encontrarTarefas();
        if (todasTarefas.rows.length === 0) throw new Error('Não há tarefas cadastradas');
    
        return todasTarefas;
    
}
    
async function tarefasId(id, authorization) {
        if (!authorization) throw new Error('Token não fornecido');

        const token = authorization.replace("Bearer ", "");
        const tokenBd = await TarefaRepositories.verificaToken(token);

        if (tokenBd.rows.length === 0) throw new Error('Token inválido');
    
        const tarefasUsuario = await TarefaRepositories.tarefasId(id);
        // console.log(tarefasUsuario)
        if (tarefasUsuario.rows.length === 0) throw new Error('Não há tarefas cadastradas para este usuário');
        
        return tarefasUsuario;
        
}

async function deletarTarefa(id, authorization) {
    if (!authorization) throw new Error('Token não fornecido');
    const token = authorization.replace("Bearer ", "");
    const tokenBd = await TarefaRepositories.verificaToken(token);
    console.log(tokenBd)
    if (tokenBd.rows.length === 0) throw new Error('Token inválido');

    const tarefasUsuario = await TarefaRepositories.selecionarTarefa(id, tokenBd);
    if (tarefasUsuario.rows.length === 0) throw new Error('A tarefa não pertence a este usuário');

    await TarefaRepositories.deletarTarefa(id);
}


 async function checkTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Verificar se a tarefa pertence ao usuário logado
        const tarefasUsuario = await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
        if (tarefasUsuario.rows.length === 0) return res.status(404).send('A tarefa não pertence a este usuário');

        // 
        await db.query(`UPDATE tarefas SET tarefa = true WHERE id = $1`, [id]);

        return res.status(200).send('Tarefa concluida');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

 async function unCheckTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Verificar se a tarefa pertence ao usuário logado
        const tarefasUsuario = await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
        if (tarefasUsuario.rows.length === 0) return res.status(404).send('A tarefa não pertence a este usuário');

        // 
        await db.query(`UPDATE tarefas SET tarefa = false WHERE id = $1`, [id]);

        return res.status(200).send('Tarefa pendente');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

export default{
    cadastrarTarefa,
    encontrarTarefas,
    tarefasId,
    deletarTarefa,
    checkTarefas,
    unCheckTarefas
}