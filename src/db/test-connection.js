import "dotenv/config";
import pool from "./config.js";

async function testConnection() {
	try {
		const result = await pool.query("SELECT NOW()");
		console.log("Conexión a la base de datos exitosa:", result.rows[0].now);
		await pool.end();
	} catch (error) {
		console.error("Error al conectar a la base de datos:", error);
	}
}

testConnection();
