import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configurar twig
app.set("views", path.join(__dirname, "View"));
app.set("view engine", "twig");

// usar as rotas
app.use(router);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
