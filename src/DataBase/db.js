import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

if (process.env.MODE === 'prod') {
    pool.ssl = true;
}

export default db;


export const todasTarefas = []
export const usuarios = []
export const idUsuario = []



