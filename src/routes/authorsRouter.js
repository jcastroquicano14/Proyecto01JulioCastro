import { Router } from "express";
import {
	createAuthor,
	deleteAuthor,
	getAllAuthors,
	getAuthorById,
	updateAuthor,
} from "../controllers/authorsControllers.js";
import validateAuthors from "../middlewares/validateAuthors.js";

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", getAuthorById);

authorsRouter.post("/", validateAuthors, createAuthor);
authorsRouter.put("/:id", validateAuthors, updateAuthor);
authorsRouter.delete("/:id", deleteAuthor);

export default authorsRouter;
