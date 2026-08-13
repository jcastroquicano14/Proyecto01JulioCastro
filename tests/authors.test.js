import request from "supertest";
import { afterAll, beforeEach, describe, expect, test } from "vitest";
import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
	// Limpiar las tablas antes de cada prueba
	await pool.query("TRUNCATE posts, authors RESTART IDENTITY CASCADE");

	// Insertar datos de prueba en la tabla authors
	await pool.query(`
        INSERT INTO authors (name, email, bio) VALUES
        ('Julio Tanta', 'julio@example.com', 'Futbolista'),
        ('Thiago Castro', 'thiago@example.com', 'Arqueologo');
    `);

	// Insertar datos de prueba en la tabla posts
	await pool.query(`
        INSERT INTO posts (title, content, author_id) VALUES
        ('Post 1', 'Contenido del post 1', 1),
        ('Post 2', 'Contenido del post 2', 2);
    `);
});

afterAll(async () => {
	// Cerrar la conexión a la base de datos después de todas las pruebas
	await pool.end();
});

describe("GET /authors", () => {
	test("debe devolver todos los autores", async () => {
		const response = await request(app).get("/authors");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body).toHaveLength(2);
		expect(response.body[0]).toHaveProperty("name");
		expect(response.body[0]).toHaveProperty("email");
		expect(response.body[0]).toHaveProperty("bio");
	});
});

describe("GET /authors/:id", () => {
	test("debe devolver un autor por su ID", async () => {
		const response = await request(app).get("/authors/1");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("name", "Julio Tanta");
		expect(response.body).toHaveProperty("email", "julio@example.com");
		expect(response.body).toHaveProperty("bio", "Futbolista");
	});

	test("debe devolver 404 si el autor no existe", async () => {
		const response = await request(app).get("/authors/999");
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error", "Author not found");
	});
});

describe("POST /authors", () => {
	test("debe crear un nuevo autor", async () => {
		const newAuthor = {
			name: "antuan Perez",
			email: "antuan@example.com",
			bio: "Escritor",
		};

		const response = await request(app).post("/authors").send(newAuthor);
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("name", "antuan Perez");
		expect(response.body).toHaveProperty("email", "antuan@example.com");
		expect(response.body).toHaveProperty("bio", "Escritor");
	});
});
