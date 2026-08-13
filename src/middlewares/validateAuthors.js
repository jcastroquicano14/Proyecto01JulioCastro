import { validarEmail, validarNombre } from "../helpers/validators.js";

export const validateAuthors = (req, res, next) => {
	const { name, email } = req.body;

	const errorNombre = validarNombre(name);

	if (errorNombre) {
		return res.status(400).json({ error: errorNombre });
	}

	const errorEmail = validarEmail(email);

	if (errorEmail) {
		return res.status(400).json({ error: errorEmail });
	}
	next();
};

export default validateAuthors;
