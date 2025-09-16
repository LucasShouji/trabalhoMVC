// src/Controller/UserController.ts
import type { Request, Response } from "express";
import { AbstractController } from "./AbstractController.js";
import { Autor } from "../Model/Autor.js";

export class UserController extends AbstractController {
  protected req: Request;
  protected res: Response;

  constructor(req: Request, res: Response) {
    super();
    this.req = req;
    this.res = res;
  }

  /**
   * Exibe o formulário de criação de usuário
   */
  async showForm() {
    this.res.render("user/form.twig", { user: {} });
  }

  /**
   * Processa o envio do formulário de criação de usuário
   */
  async create() {
    try {
      const { nome } = this.req.body;

      if (!nome || nome.trim() === "") {
        return this.res.render("user/form.twig", {
          user: { nome },
          error: "O nome é obrigatório."
        });
      }

      const autor = new Autor(nome);
      autor.nome = nome;
      await autor.save();

      return this.res.redirect("/user");
    } catch (error) {
      console.error(error);
      return this.res.render("user/form.twig", {
        user: this.req.body,
        error: "Erro ao salvar usuário."
      });
    }
  }

  /**
   * Lista todos os usuários
   */
  async index() {
    try {
      const autores = await Autor.getAll();
      this.res.render("user.twig", { autores });
    } catch (error) {
      console.error(error);
      this.res.render("user.twig", {
        autores: [],
        error: "Erro ao listar usuários."
      });
    }
  }
}
