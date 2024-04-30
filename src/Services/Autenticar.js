
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import db from '../DataBase/db.js'




export async function signup(req, res) {
    // Recebe os dados do cliente
    const usuario = req.body;

    try {
        // Verifica se o usuário já está cadastrado
        const cadastro = await db.query('SELECT * FROM usuario WHERE email = $1', [usuario.email]);
        if (cadastro.rows.length > 0) {
            // Se o usuário já existe, retorna um erro 409 (Conflito)
            return res.status(409).send('Usuário já cadastrado');
        }

        // Se for um usuario novo, criptografa a senha
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

        // Insere o novo usuário no banco de dados
        await db.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, senhaCriptografada]);

        return res.status(201).send('Usuário cadastrado com sucesso');

    } catch (error) {
        // Se ocorrer um erro, retorna um status 500 (Erro interno do servidor)
        console.error('Erro no servidor:', error);
        return res.status(500).send(error, 'Ocorreu um erro interno. Por favor, tente novamente mais tarde. aut1');
    }
}
// ---------------------------------------------------------------------------- 


export async function login(req, res) {
    const usuario = req.body;
    const token = uuidv4();

    try {

        // Verifica se o usuário existe
        const verificaUsuario = await db.query(`SELECT * FROM usuario WHERE email = $1`, [usuario.email]);
        if (verificaUsuario.rows.length === 0) return res.status(404).send('Usuário não encontrado');

        // Extrai a senha do usuário do resultado da consulta
        const senhaHash = verificaUsuario.rows[0].senha;

        // Compara a senha fornecida com a senha hash do banco de dados
        const senhaCorreta = await bcrypt.compare(usuario.senha, senhaHash);
        if (!senhaCorreta) return res.status(401).send('Senha incorreta');


        // Verifica se há uma sessão ativa para o usuário
        const idUsuario = verificaUsuario.rows[0].id;
        const verificaSessao = await db.query(`SELECT * FROM sessao WHERE id_usuario = $1`, [idUsuario]);

        if (verificaSessao.rows.length > 0) {
            // Se houver uma sessão ativa, exclua-a
            await db.query(`DELETE FROM sessao WHERE id_usuario = $1`, [idUsuario]);
        }

        // Insere o novo token na tabela de sessão
        await db.query(`INSERT INTO sessao (id_usuario, token) VALUES ($1, $2)`, [idUsuario, token]);


        // Retorna sucesso
        return res.status(200).send({ token, idUsuario });

    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).send(error, 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.aut2');
    }
}



