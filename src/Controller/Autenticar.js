
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import db from '../DataBase/db.js'
import AutenticarServices from '../Services/AutenticarServices.js';



// Controller
async function signup(req, res) {
    const usuario = req.body;

    try {
        await AutenticarServices.signup(usuario);
        return res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {

        if (error) {
            return res.status(409).send('Usuário já cadastrado');
        }
        
        console.error('Erro no serviço:', error.message);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}


// ---------------------------------------------------------------------------- 


async function login(req, res) {
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



export default {
    signup,
    login
}