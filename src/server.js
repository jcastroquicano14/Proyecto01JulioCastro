import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor Express en http://localhost:${PORT}`);
});
