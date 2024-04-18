import db from '../DataBase/db.js'


export async function cadastrarTarefas(req, res) {
    const tarefa = req.body
    const { authorization } = req.headers

    // guarda somente os numeros do token, subistituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token])
        if (tokenBd.rows.length === 0) return res.status(404).send('Token invalido');

        await db.query(`INSERT INTO tarefas (id_usuario, tarefa) VALUES ($1, $2)`, [tokenBd.rows[0].id_usuario, tarefa.tarefa])

        // return res.status(201).send(tokenBd);
        return res.status(201).send('Tarefa Cadastrada!');

    } catch (error) {
        return res.status(500).send(error,'Ocorreu um erro interno. Por favor, tente novamente mais tarde. tare1');
    }
}

export async function encontrarTarefas(req, res) {
    const { authorization } = req.headers
    // guarda somente os numeros do token, subistituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token])
        if (tokenBd.rows.length === 0) return res.status(404).send('Token invalido');

       const todasTarefas = await db.query(`SELECT tarefas.*, usuario.nome 
       FROM tarefas 
       JOIN usuario ON tarefas.id_usuario = usuario.id;`)

       if (todasTarefas.rows.length === 0) return res.status(404).send('Não há tarefas cadastradas');


        return res.status(200).send(todasTarefas.rows);

    } catch (error) {
        return res.status(500).send(error,'Erro no servidor')
    }
}

export async function tarefasId(req, res) {
    const { id } = req.params
    const { authorization } = req.headers

     // guarda somente os numeros do token, subistituindo o Bearer por vazio
     const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer

     try {
         const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token])
         if (tokenBd.rows.length === 0) return res.status(404).send('Token invalido');
        
         const tarefasId = await db.query(`SELECT * FROM tarefas WHERE id_usuario = $1 `,[id])
         if (tarefasId.rows.length === 0) return res.status(404).send('Não há tarefas cadastradas  com esse id');

 
         return res.status(200).send(tarefasId.rows);
 
     } catch (error) {
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde. tare2');

     }
  
}


