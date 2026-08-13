import {
	validarAutorId,
	validarContenido,
	validarTitulo,
} from "../helpers/validators.js";

export const validatePosts = (req, res, next) => {
	const { title, content, author_id } = req.body;

	const errorTitulo = validarTitulo(title);
	if (errorTitulo) {
		return res.status(400).json({ error: errorTitulo });
	}

	const errorContenido = validarContenido(content);
	if (errorContenido) {
		return res.status(400).json({ error: errorContenido });
	}

	const errorAutorId = validarAutorId(author_id);
	if (errorAutorId) {
		return res.status(400).json({ error: errorAutorId });
	}

	next();
};

export default validatePosts;
