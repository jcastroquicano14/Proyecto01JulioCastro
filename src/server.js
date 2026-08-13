import "dotenv/config";
import app from "./app.js";
import pool from "./db/config.js";

const PORT = process.env.PORT || 3000;

pool
	.query("SELECT NOW()")
	.then(() => {
		console.log("Conexion a la base de datos establecida correctamente");

		app.listen(PORT, () => {
			console.log(`Servidor escuchando en el puerto ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error al conectar a la base de datos:", error);
	});
