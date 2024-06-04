import db from '../DataBase/db.js'


async function verificaToken(token) {
    return await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
}

async function cadastrarTarefa(tarefa, tokenBd) {
    return await db.query(`INSERT INTO tarefas (id_usuario, titulo_tarefa, descricao_tarefa) VALUES ($1, $2, $3)`, [tokenBd.rows[0].id_usuario, tarefa.titulo, tarefa.descricao]);
}

async function encontrarTarefas(){ 
    return await db.query(`SELECT tarefas.*, usuario.nome 
       FROM tarefas 
       JOIN usuario ON tarefas.id_usuario = usuario.id;`)
}

async function tarefasId(id){
    return await db.query(`
    SELECT tarefas.*, usuario.nome 
    FROM tarefas 
    JOIN usuario ON tarefas.id_usuario = usuario.id
    WHERE tarefas.id_usuario = $1;
`, [id]);
}


// seleciona a tarefa e o usuario dono da tarefa
async function selecionarTarefa(id, tokenBd) {
    return await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
}

async function deletarTarefa(id) {
    await db.query(`DELETE FROM tarefas WHERE id = $1`, [id]);
}

async function checkTarefas(id){
    await db.query(`UPDATE tarefas SET concluida = true WHERE id = $1`, [id]);
}

async function unCheckTarefas(id){
    await db.query(`UPDATE tarefas SET concluida = false WHERE id = $1`, [id]);
}

export default{
    verificaToken,
    cadastrarTarefa,
    encontrarTarefas,
    tarefasId,
    selecionarTarefa,
    deletarTarefa,
    checkTarefas,
    unCheckTarefas
}