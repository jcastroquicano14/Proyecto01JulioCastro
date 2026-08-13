import {
	createAuthorService,
	deleteAuthorService,
	getAllAuthorsService,
	getAuthorByIdService,
	updateAuthorService,
} from "../services/authorsServices.js";

export const getAllAuthors = async (req, res, next) => {
	try {
		const authors = await getAllAuthorsService();
		res.json(authors);
	} catch (error) {
		next(error);
	}
};

export const getAuthorById = async (req, res, next) => {
	try {
		const author = await getAuthorByIdService(req.params.id);

		if (!author) {
			return res.status(404).json({ error: "Autor no encontrado" });
		}

		res.json(author);
	} catch (error) {
		next(error);
	}
};

export const createAuthor = async (req, res, next) => {
	try {
		const { name, email, bio } = req.body;

		if (!name || !email) {
			return res
				.status(400)
				.json({ error: "Nombre y correo electrónico son obligatorios" });
		}

		const newAuthor = await createAuthorService({ name, email, bio });
		res.status(201).json(newAuthor);
	} catch (error) {
		// Si la base de datos detecta un email duplicado
		if (error.code === "23505") {
			return res
				.status(409)
				.json({ error: "El correo electrónico ya está en uso" });
		}
		next(error);
	}
};

export const updateAuthor = async (req, res, next) => {
	try {
		const updatedAuthor = await updateAuthorService(req.params.id, req.body);

		if (!updatedAuthor) {
			return res.status(404).json({ error: "Autor no encontrado" });
		}

		res.json(updatedAuthor);
	} catch (error) {
		if (error.code === "23505") {
			return res
				.status(409)
				.json({ error: "El correo electrónico ya está en uso" });
		}
		next(error);
	}
};

export const deleteAuthor = async (req, res, next) => {
	try {
		const deletedAuthor = await deleteAuthorService(req.params.id);

		if (!deletedAuthor) {
			return res.status(404).json({ error: "Autor no encontrado" });
		}

		res.json({ message: "Autor eliminado correctamente" });
	} catch (error) {
		next(error);
	}
};
