
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import { idUsuario, usuarios } from '../DataBase/db.js'
import db from '../DataBase/db.js'




export async function singup(req, res) {
    //request, response: são solicitações HTTP. 
    //req = são para receber dados do cliente
    //res = são pra enviar dados para o cliente

    const usuario = req.body
    //oque recebo do cliente

    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaCriptografada;
    //criptografar senha

    
    try {
        // const cadastro2 = usuarios.find(obj => obj.email == usuario.email)
        const cadastro = db.query(`SELECT * FROM usuario where  ${emailclear == usuario.email }  `)
        //na variavel cadastro rece a informação de usuarios= body, vejo se no campo email existe o mesmo email cadastrado
        if (cadastro) return res.status(409).send('Usuario já cadastrado')
        // caso exista recebo true, quer dizer que já existe o email especifico cadastrado
        // caso cadastrado seja false, quer dizer que naõ existe um email igual cadastrado,
        // o codigo e continuado

       

        //então permite cadastrar o usuario
        const query = `INSERT INTO ${usuarios} (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`;
        const values = [nome, email, senha];

       
       
        res.status(201).send('foi')


    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
}

// ---------------------------------------------------------------------------- 


export async function login(req, res) {
    const usuario = req.body
    const token = uuidv4()


    // const { error } = loginSchema.validate(usuario, { abortEarly: false });
    // if (error) {
    //     const erros = error.details.map((obj) => {
    //         return obj.message
    //     })
    //     return res.status(422).send(erros)
    // }

    try {

        const verificaLogin = usuarios.find(obj => obj.email === usuario.email)
        if (!verificaLogin) return res.status(404).send('Usuario não encontrado')

        const senhaCorreta = bcrypt.compareSync(usuario.senha, verificaLogin.senha)
        if (!senhaCorreta) return res.status(404).send('Usuario não encontrado')

        // idUsuario.push({idUsuario:verificaLogin.id, token})
        const id = usuarios.length
        idUsuario.push({ idUsuario: id, token })

        // res.status(200).send(token)
        res.status(200).send(idUsuario)
        console.log(usuarios)



    } catch (error) {
        res.status(500).send('Erro no servidor')
    }

}

