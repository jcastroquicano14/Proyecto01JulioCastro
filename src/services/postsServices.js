import pool from "../db/config.js";

export const getAllPostsService = async (published) => {
	let query = "SELECT * FROM posts";
	let params = [];

	if (published !== undefined) {
		query += " WHERE published = $1";
		params.push(published === "true");
	}

	const result = await pool.query(query, params);
	return result.rows;
};

export const getPostByIdService = async (id) => {
	const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
	return result.rows[0] || null;
};

export const createPostService = async ({
	title,
	content,
	author_id,
	published,
}) => {
	const result = await pool.query(
		"INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
		[title, content, author_id, published || false],
	);
	return result.rows[0];
};

export const updatePostService = async (id, { title, content, published }) => {
	const result = await pool.query(
		"UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published) WHERE id = $4 RETURNING *",
		[title, content, published, id],
	);
	return result.rows[0] || null;
};

export const deletePostService = async (id) => {
	const result = await pool.query(
		"DELETE FROM posts WHERE id = $1 RETURNING *",
		[id],
	);
	return result.rows[0] || null;
};

export const getPostsByAuthorService = async (author_id) => {
	const result = await pool.query("SELECT * FROM posts WHERE author_id = $1", [
		author_id,
	]);
	return result.rows;
};
