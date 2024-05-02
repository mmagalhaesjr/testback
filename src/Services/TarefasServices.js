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

        const token = authorization.replace("Bearer ", ""); // tem que ter um espaço apos o Bearer
        const tokenBd = await TarefaRepositories.verificaToken(token);
        if (tokenBd.rows.length === 0) throw new Error('Token inválido');
    
        const todasTarefas = await TarefaRepositories.encontrarTarefas();
        if (todasTarefas.rows.length === 0) throw new Error('Não há tarefas cadastradas');
    
        return todasTarefas;
    
}
    
async function tarefasId(id, authorization) {
        
        const token = authorization.replace("Bearer ", "");
        const tokenBd = await TarefaRepositories.verificaToken(token);
        

        if (tokenBd.rows.length === 0) throw new Error('Token inválido');
    
        const tarefasUsuario = await TarefaRepositories.tarefasId(id,tokenBd);
       
      
        if (tarefasUsuario.rows.length === 0) throw new Error('Não há tarefas cadastradas para este usuário');
        
        return tarefasUsuario;
        
}

async function deletarTarefa(id, authorization) {
    
    const token = authorization.replace("Bearer ", "");
    const tokenBd = await TarefaRepositories.verificaToken(token);
    if (tokenBd.rows.length === 0) throw new Error('Token inválido');

    const tarefasUsuario = await TarefaRepositories.selecionarTarefa(id, tokenBd);
    if (tarefasUsuario.rows.length === 0) throw new Error('A tarefa não pertence a este usuário');

    await TarefaRepositories.deletarTarefa(id);
}

 async function checkTarefas(id, authorization) {
    const token = authorization.replace("Bearer ", "");
    const tokenBd = await TarefaRepositories.verificaToken(token);
    if (tokenBd.rows.length === 0) throw new Error('Token inválido');

    const tarefasUsuario = await TarefaRepositories.selecionarTarefa(id, tokenBd);
    if (tarefasUsuario.rows.length === 0) throw new Error('A tarefa não pertence a este usuário');

    await TarefaRepositories.checkTarefas(id)
}

 async function unCheckTarefas(id, authorization) {
   
 }



export default{
    cadastrarTarefa,
    encontrarTarefas,
    tarefasId,
    deletarTarefa,
    checkTarefas,
    unCheckTarefas
}