
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import { idUsuario, usuarios } from '../DataBase/db.js'
import{cadastroSchema, loginSchema} from '../Schema/AutenticarSchema.js'


export async function singup(req, res) {
    const usuario = req.body

   
    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaCriptografada;



    const { error } = cadastroSchema.validate(usuario, { abortEarly: false });
    if (error) {
        const erros = error.details.map((obj) => {
            return obj.message
        })
        return res.status(422).send(erros)
    }

    try {
        const cadastro = usuarios.find(obj => obj.email == usuario.email)

        if (cadastro) return res.status(409).send('Usuario já cadastrado')

        const id = usuarios.length + 1 //implementando id no array
        usuarios.push({ nome: usuario.nome, email: usuario.email, senha: usuario.senha, id: id })


        res.status(201).send('Usuario cadastrado com sucesso.')


    } catch (error) {
        res.status(500).send('Erro no servidor')
    }
}

// ---------------------------------------------------------------------------- 


export async function login(req, res) {
    const usuario = req.body
    const token = uuidv4()

  


    const { error } = loginSchema.validate(usuario, { abortEarly: false });
    if (error) {
        const erros = error.details.map((obj) => {
            return obj.message
        })
        return res.status(422).send(erros)
    }

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

