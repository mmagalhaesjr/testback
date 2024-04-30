import db from '../DataBase/db.js'



async function verificaEmail(usuario) {
    return await db.query('SELECT * FROM usuario WHERE email = $1', [usuario.email]);
}

async function cadastrar(usuario) {
    await db.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, usuario.senhaCriptografada]);
}


async function verificaUsuario(){
    return await db.query(`SELECT * FROM usuario WHERE email = $1`, [usuario.email]);
}

async function verificaSessao(){
    return await db.query(`DELETE FROM sessao WHERE id_usuario = $1`, [idUsuario]);
}

async function inserirTokenSecao(){
    await db.query(`INSERT INTO sessao (id_usuario, token) VALUES ($1, $2)`, [idUsuario, token]);
}








export default{
    verificaEmail,
    cadastrar 
}