// src/routes.ts
import { Router } from "express";
import { PostController } from "./Controller/PostController.js";
import { UserCreateController } from "./Controller/UserCreateController.js";

const router = Router();
const userCreateController = new UserCreateController();

/*
Métodos para criar os posts da API.
*/
router.get("/post/create", async (req, res) => {
  await new PostController(req, res).showForm();
});


router.post("/post/create", async (req, res) => {
  await new PostController(req, res).create();
});

/**
 * Rotas para criar o usuário da API.
 */

router.get("/user/create", (req, res) => {
  userCreateController.init(req, res);
  userCreateController.showForm();
});

router.post("/user/create", (req, res) => {
  userCreateController.init(req, res);
  userCreateController.create();
});
export default router;
