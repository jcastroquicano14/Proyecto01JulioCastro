import request from "supertest";
import { afterAll, beforeEach, describe, expect, test } from "vitest";
import app from "../src/app.js";
import pool from "../src/db/config.js";
beforeEach(async () => {
	await pool.query("TRUNCATE posts, authors RESTART IDENTITY CASCADE");

	await pool.query(`
        INSERT INTO authors (name, email, bio) VALUES
        ('Julio Tanta', 'julio@example.com', 'Futbolista'),
        ('Thiago Castro', 'thiago@example.com', 'Arqueologo');
    `);

	await pool.query(`
        INSERT INTO posts (title, content, author_id) VALUES
        ('Post 1', 'Contenido del post 1', 1),
        ('Post 2', 'Contenido del post 2', 2);
    `);
});

afterAll(async () => {
	await pool.end();
});

describe("GET /posts", () => {
	test("debe devolver todos los posts", async () => {
		const response = await request(app).get("/posts");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body).toHaveLength(2);
		expect(response.body[0]).toHaveProperty("title");
		expect(response.body[0]).toHaveProperty("content");
		expect(response.body[0]).toHaveProperty("author_id");
	});
});

describe("GET /posts/:id", () => {
	test("debe devolver un post por su ID", async () => {
		const response = await request(app).get("/posts/1");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("title", "Post 1");
		expect(response.body).toHaveProperty("content", "Contenido del post 1");
		expect(response.body).toHaveProperty("author_id", 1);
	});

	test("debe devolver 404 si el post no existe", async () => {
		const response = await request(app).get("/posts/999");
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Post not found");
	});
});
