// src/Controllers/UserCreateController.ts
import { AbstractController } from "./AbstractController.js";
import { Autor } from "../Model/Autor.js";

export class UserCreateController extends AbstractController {

  // exibe o formulário vazio para criação
  public async showForm(): Promise<void> {
    this.res.render("user/form.twig", { user: {} });
  }

  // processa o formulário enviado via POST
  public async create(): Promise<void> {
    const { nome, email } = this.getParams();

    if (!nome || !email) {
      return this.res.render("user/form.twig", { 
        user: { nome, email },
        error: "Todos os campos são obrigatórios" 
      });
    }

    try {
      const user = new Autor(nome, email);
      await user.save();
      this.res.redirect("/user"); // ou rota de listagem de usuários
    } catch (err: any) {
      this.res.render("user/form.twig", { 
        user: { nome, email }, 
        error: err.message 
      });
    }
  }
}
