import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;


// const configDatabase = {
//   connectionString: process.env.DATABASE_URL,
//  ssl:true
// };

// const db = new Pool(configDatabase);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:true
})

export default db;












