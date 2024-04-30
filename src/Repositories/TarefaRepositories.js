import db from '../DataBase/db.js'


async function verificaToken(token) {
    return await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
}

async function criarTarefa(tarefa, tokenBd) {
    return await db.query(`INSERT INTO tarefas (id_usuario, titulo_tarefa, descricao_tarefa) VALUES ($1, $2, $3)`, [tokenBd.rows[0].id_usuario, tarefa.titulo, tarefa.descricao]);
}

export default{
    verificaToken,
    criarTarefa
}