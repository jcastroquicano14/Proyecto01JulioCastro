import {
	createPostService,
	deletePostService,
	getAllPostsService,
	getPostByIdService,
	getPostsByAuthorService,
	updatePostService,
} from "../services/postsServices.js";

export const getAllPosts = async (req, res, next) => {
	try {
		const { published } = req.query;
		const posts = await getAllPostsService(published);
		res.json(posts);
	} catch (error) {
		next(error);
	}
};

export const getPostById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await getPostByIdService(id);

		if (!post) {
			return res.status(404).json({ error: "Post no encontrado" });
		}

		res.json(post);
	} catch (error) {
		next(error);
	}
};

export const createPost = async (req, res, next) => {
	try {
		const { title, content, author_id, published } = req.body;

		if (!title || !content || !author_id) {
			return res.status(400).json({ error: "Faltan campos obligatorios" });
		}

		const newPost = await createPostService({
			title,
			content,
			author_id,
			published,
		});

		res.status(201).json(newPost);
	} catch (error) {
		// Si la clave foránea del autor no existe (foreign_key_violation)
		if (error.code === "23503") {
			return res.status(400).json({ error: "El autor especificado no existe" });
		}
		next(error);
	}
};

export const updatePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedPost = await updatePostService(id, req.body);

		if (!updatedPost) {
			return res.status(404).json({ error: "Post no encontrado" });
		}

		res.json(updatedPost);
	} catch (error) {
		if (error.code === "23503") {
			return res.status(400).json({ error: "El autor especificado no existe" });
		}
		next(error);
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedPost = await deletePostService(id);

		if (!deletedPost) {
			return res.status(404).json({ error: "Post no encontrado" });
		}

		res.json(deletedPost);
	} catch (error) {
		next(error);
	}
};

export const getPostsByAuthor = async (req, res, next) => {
	try {
		const { author_id } = req.params;
		const posts = await getPostsByAuthorService(author_id);

		if (posts.length === 0) {
			return res
				.status(404)
				.json({ error: "No se encontraron posts para este autor" });
		}

		res.json(posts);
	} catch (error) {
		next(error);
	}
};
