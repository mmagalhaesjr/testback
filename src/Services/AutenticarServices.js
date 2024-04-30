import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import AutenticarRepositories from '../Repositories/AutenticarRepositories.js'


async function signup(usuario) {
    const { rowCount } = await AutenticarRepositories.verificaEmail(usuario);

    if (rowCount > 0) {
        throw new Error('Usuário já cadastrado');
    }

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    await AutenticarRepositories.cadastrar({ nome: usuario.nome, email: usuario.email, senhaCriptografada });
}

// ---------------------------------------------------------------------------- 

async function login(usuario) {
    const verificaUsuario = await AutenticarRepositories.verificaUsuario(usuario);

    if (!verificaUsuario.rows.length) {
        throw new Error('Usuário não encontrado');
    }

    const senhaHash = verificaUsuario.rows[0].senha;
    const senhaCorreta = await bcrypt.compare(usuario.senha, senhaHash);

    if (!senhaCorreta) {
        throw new Error('Senha incorreta');
    }

    const idUsuario = verificaUsuario.rows[0].id;
    const token = uuidv4();

    await AutenticarRepositories.inserirTokenSecao(idUsuario, token);

    return token;
}




export default {
    signup,
    login
}