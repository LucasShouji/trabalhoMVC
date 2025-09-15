// src/Controllers/UserController.ts
import { AbstractController } from "./AbstractController.js";
import { Autor } from "../Model/Autor.js";

export class UserController extends AbstractController {

  // exibe o formulário de criação ou edição
  public async showForm(id?: number): Promise<void> {
    let user: Autor | Record<string, any> = {};

    if (id) {
      const loaded = await new Autor("", "").load(id); // substitua campos obrigatórios
      if (!loaded) {
        return this.res.status(404).send("Usuário não encontrado");
      }
      user = loaded;
      // opcional: carregar posts relacionados
      if (user.id) {
        const posts = await user.getPosts?.(); // se você implementar getPosts() no Autor
        user.posts = posts || [];
      }
    }

    this.res.render("user/form.twig", { user });
  }

  // cria um novo usuário
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

  // atualiza um usuário existente
  public async update(): Promise<void> {
    const { id, nome, email } = this.getParams();

    if (!id || !nome || !email) {
      return this.res.render("user/form.twig", { 
        user: { id, nome, email }, 
        error: "Todos os campos são obrigatórios" 
      });
    }

    try {
      const user = await new Autor("", "").load(Number(id));
      if (!user) return this.res.status(404).send("Usuário não encontrado");

      user.nome = nome;
      user.email = email;
      await user.save();
      this.res.redirect("/user");
    } catch (err: any) {
      this.res.render("user/form.twig", { 
        user: { id, nome, email }, 
        error: err.message 
      });
    }
  }
}
