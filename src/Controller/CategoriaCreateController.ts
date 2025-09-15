// src/Controllers/CategoryCreateController.ts
import { AbstractController } from "./AbstractController.js";
import { Categoria } from "../Model/Categoria.js";

export class CategoriaCreateController extends AbstractController {
  public async execute(): Promise<void> {
    const { nome, descricao } = this.getParams();

    if (!nome) {
      this.res.status(400).json({ error: "Nome é obrigatório" });
      return;
    }

    const categoria = new Categoria(nome, descricao);
    await categoria.save();

    this.res.status(201).json(categoria);
  }
}
