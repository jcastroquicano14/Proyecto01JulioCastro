import pool from "../db/config.js";

export const getAllPosts = async (req, res) => {
	try {
		const { published } = req.query;

		let query = "SELECT * FROM posts";
		let params = [];

		if (published !== undefined) {
			query += " WHERE published = $1";
			params.push(published === "true");
		}

		const result = await pool.query(query, params);
		res.json(result.rows);
	} catch (error) {
		console.error("Error obteniendo posts:", error);
		res.status(500).json({ error: "Error obteniendo posts" });
	}
};

export const getPostById = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
			id,
		]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Post no encontrado" });
		}
		res.json(result.rows[0]);
	} catch (error) {
		console.error("Error obteniendo post:", error);
		res.status(500).json({ error: "Error obteniendo post" });
	}
};

export const createPost = async (req, res) => {
	try {
		const { title, content, author_id, published } = req.body;

		if (!title || !content || !author_id) {
			return res.status(400).json({ error: "Faltan campos obligatorios" });
		}

		const result = await pool.query(
			"INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
			[title, content, author_id, published || false],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Error creando post:", error);

		if (error.code === "23503") {
			return res
				.status(400)
				.json({ error: "El autor especificado no existe" });
		}

		res.status(500).json({ error: "Error creando post" });
	}
};

export const updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, published } = req.body;
		const result = await pool.query(
			"UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published) WHERE id = $4 RETURNING *",
			[title, content, published, id],
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Post no encontrado" });
		}
		res.json(result.rows[0]);
	} catch (error) {
		console.error("Error actualizando post:", error);
		res.status(500).json({ error: "Error actualizando post" });
	}
};

export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			"DELETE FROM posts WHERE id = $1 RETURNING *",
			[id],
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Post no encontrado" });
		}
		res.json(result.rows[0]);
	} catch (error) {
		console.error("Error eliminando post:", error);
		res.status(500).json({ error: "Error eliminando post" });
	}
};

export const getPostsByAuthor = async (req, res) => {
	try {
		const { author_id } = req.params;
		const result = await pool.query(
			"SELECT * FROM posts WHERE author_id = $1",
			[author_id],
		);
		res.json(result.rows);
	} catch (error) {
		console.error("Error obteniendo posts del autor:", error);
		res.status(500).json({ error: "Error obteniendo posts del autor" });
	}
};
