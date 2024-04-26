import db from '../DataBase/db.js'


export async function cadastrarTarefas(req, res) {
    const tarefa = req.body
    const { authorization } = req.headers

    // guarda somente os numeros do token, subistituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", "") // tem que ter um espaço apos o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token])
        if (tokenBd.rows.length === 0) return res.status(404).send('Token invalido');

        await db.query(`INSERT INTO tarefas (id_usuario, titulo_tarefa, descricao_tarefa) VALUES ($1, $2, $3)`, [tokenBd.rows[0].id_usuario, tarefa.titulo, tarefa.descricao])

        // return res.status(201).send(tokenBd);
        return res.status(201).send('Tarefa Cadastrada!');

    } catch (error) {
        return res.status(500).send(error, 'Ocorreu um erro interno. Por favor, tente novamente mais tarde. tare1');
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
        return res.status(500).send(error, 'Erro no servidor')
    }
}

export async function tarefasId(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Consulta para obter as tarefas do usuário logado com o nome do usuário
        const tarefasUsuario = await db.query(`
            SELECT tarefas.*, usuario.nome 
            FROM tarefas 
            JOIN usuario ON tarefas.id_usuario = usuario.id
            WHERE tarefas.id_usuario = $1;
        `, [id]);

        if (tarefasUsuario.rows.length === 0) return res.status(404).send('Não há tarefas cadastradas para este usuário');

        return res.status(200).send(tarefasUsuario.rows);

    } catch (error) {
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

export async function deletarTarefa(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Verificar se a tarefa pertence ao usuário logado
        const tarefasUsuario = await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
        if (tarefasUsuario.rows.length === 0) return res.status(404).send('A tarefa não pertence a este usuário');

        // Deletar a tarefa
        await db.query(`DELETE FROM tarefas WHERE id = $1`, [id]);

        return res.status(200).send('Tarefa excluída com sucesso');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

export async function checkTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Verificar se a tarefa pertence ao usuário logado
        const tarefasUsuario = await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
        if (tarefasUsuario.rows.length === 0) return res.status(404).send('A tarefa não pertence a este usuário');

        // 
        await db.query(`UPDATE tarefas SET tarefa = true WHERE id = $1`, [id]);

        return res.status(200).send('Tarefa concluida');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}
export async function unCheckTarefas(req, res) {
    const { id } = req.params; // ID da tarefa a ser excluída
    const { authorization } = req.headers;

    // guarda somente os números do token, substituindo o Bearer por vazio
    const token = authorization.replace("Bearer ", ""); // tem que ter um espaço após o Bearer

    try {
        const tokenBd = await db.query(`SELECT * FROM sessao WHERE token = $1`, [token]);
        if (tokenBd.rows.length === 0) return res.status(404).send('Token inválido');

        // Verificar se a tarefa pertence ao usuário logado
        const tarefasUsuario = await db.query(`SELECT * FROM tarefas WHERE id = $1 AND id_usuario = $2`, [id, tokenBd.rows[0].id_usuario]);
        if (tarefasUsuario.rows.length === 0) return res.status(404).send('A tarefa não pertence a este usuário');

        // 
        await db.query(`UPDATE tarefas SET tarefa = false WHERE id = $1`, [id]);

        return res.status(200).send('Tarefa pendente');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocorreu um erro interno. Por favor, tente novamente mais tarde.');
    }
}

