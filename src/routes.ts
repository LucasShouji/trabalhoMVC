// src/routes.ts
import { Router } from "express";
import { PostController } from "./Controller/PostController.js";
import { UserCreateController } from "./Controller/UserCreateController.js";

const router = Router();
const userCreateController = new UserCreateController();

// GET /post/create
router.get("/post/create", async (req, res) => {
  await new PostController(req, res).showForm();
});

// POST /post/create
router.post("/post/create", async (req, res) => {
  await new PostController(req, res).create();
});

// GET /user/create -> mostra formulário
router.get("/user/create", (req, res) => {
  userCreateController.init(req, res);
  userCreateController.showForm();
});

// POST /user/create -> processa formulário
router.post("/user/create", (req, res) => {
  userCreateController.init(req, res);
  userCreateController.create();
});
export default router;
