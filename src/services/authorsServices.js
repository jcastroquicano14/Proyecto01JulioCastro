import pool from "../db/config.js";

export const getAllAuthorsService = async () => {
	const result = await pool.query("SELECT * FROM authors ORDER BY name");
	return result.rows;
};

export const getAuthorByIdService = async (id) => {
	const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
	return result.rows[0] || null;
};

export const createAuthorService = async ({ name, email, bio }) => {
	const result = await pool.query(
		"INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
		[name, email, bio || null],
	);
	return result.rows[0];
};

export const updateAuthorService = async (id, { name, email, bio }) => {
	const result = await pool.query(
		"UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *",
		[name, email, bio || null, id],
	);
	return result.rows[0] || null;
};

export const deleteAuthorService = async (id) => {
	const result = await pool.query(
		"DELETE FROM authors WHERE id = $1 RETURNING *",
		[id],
	);
	return result.rows[0] || null;
};
