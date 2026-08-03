import { Router } from "express";
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
	getPostsByAuthor,
	updatePost,
} from "../controllers/postsControllers.js";

const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getPostById);
postsRouter.get("/posts/:author_id", getPostsByAuthor);
postsRouter.post("/", createPost);
postsRouter.put("/:id", updatePost);
postsRouter.delete("/:id", deletePost);

export default postsRouter;
