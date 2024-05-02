import AutenticarServices from '../Services/AutenticarServices.js';

async function signup(req, res) {
    const usuario = req.body;
    

    try {
        await AutenticarServices.signup(usuario);
        return res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {
        if (error.message === 'Usuário já cadastrado') {
            return res.status(409).send('Usuário já cadastrado');
        }

        console.error('Erro no serviço:', error.message);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

// ---------------------------------------------------------------------------- 

async function login(req, res) {
    const usuario = req.body;

    try {
        const token = await AutenticarServices.login(usuario);
        return res.status(200).send({ token });
    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}


export default {
    signup,
    login
}