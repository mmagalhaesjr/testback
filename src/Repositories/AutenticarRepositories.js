import db from '../DataBase/db.js'



async function verificaEmail(usuario) {
    return await db.query('SELECT * FROM usuario WHERE email = $1', [usuario.email]);
}
async function cadastrar(usuario) {
    await db.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, usuario.senhaCriptografada]);
}





async function verificaUsuario(usuario) {
    return await db.query(`SELECT * FROM usuario WHERE email = $1`, [usuario.email]);
}
async function verificaSessao(idUsuario) {
    const result = await db.query(`SELECT * FROM sessao WHERE id_usuario = $1`, [idUsuario]);
    return result.rows.length > 0;
}
async function inserirTokenSecao(idUsuario, token) {
    await db.query(`INSERT INTO sessao (id_usuario, token) VALUES ($1, $2)`, [idUsuario, token]);
}
async function deletaSecao(idUsuario) {
    await db.query(`DELETE FROM sessao WHERE id_usuario = $1`, [idUsuario]);
}






export default{
    verificaEmail,
    cadastrar,

    verificaUsuario,
    verificaSessao,
    inserirTokenSecao,
    deletaSecao
}