// src/Controllers/PostController.ts
import { AbstractController } from "./AbstractController.js";
import type { Request, Response } from "express";

export class PostController extends AbstractController {
  constructor(req?: Request, res?: Response) {
    super();
    if (req && res) {
      this.req = req;
      this.res = res;
    }
  }

  public async showForm(): Promise<void> {
    this.res.render("post/form.twig", { post: {} });
  }

  public async create(): Promise<void> {
    const { titulo, conteudo, userId } = this.req.body;
    this.res.json({ titulo, conteudo, userId });
  }
}
