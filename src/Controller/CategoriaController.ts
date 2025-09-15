import { AbstractController } from "./AbstractController.js";
import { Categoria } from "../Model/Categoria.js";

export class CategoriaController extends AbstractController {
  public execute(): Promise<void> {
      throw new Error("Method not implemented.");
  }
  protected async handle(): Promise<any> {
    const { id, nome, descricao } = this.getParams();
    const method = this.getMethod();

    if (method === "POST") {
      const categoria = new Categoria(nome, descricao);
      await categoria.save();
      return categoria;
    }

    if (method === "GET") {
  if (id) {
    const categoria = await new Categoria("").load({ id: Number(id) });
    if (!categoria) throw new Error("Categoria não encontrada");
    return categoria;
  } else {
    // agora usamos o método estático findAll
    return await Categoria.findAll();
  }
}
}
}
