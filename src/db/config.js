import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_PUBLIC_URL,
});

export default pool;
