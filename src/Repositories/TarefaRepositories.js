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

export default{
    verificaToken,
    cadastrarTarefa,
    encontrarTarefas,
    tarefasId
}