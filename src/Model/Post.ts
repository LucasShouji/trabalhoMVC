// src/Model/Post.ts
import { AbstractModel } from "./AbstractModel.js";

export class Post extends AbstractModel {
  getAutor: any;
  getConteudo() {
      throw new Error("Method not implemented.");
  }
  getTitulo() {
      throw new Error("Method not implemented.");
  }
  public titulo: string;
  public conteudo: string;
  public autorId: number;  // Melhor armazenar o ID do autor
  public categoriaId: number | undefined; // opcional

  constructor(
    titulo: string = "",
    conteudo: string = "",
    autorId: number = 0,
    categoriaId?: number | undefined,
    id?: number
  ) {
    super("posts"); // nome da tabela
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.autorId = autorId;
    this.categoriaId = categoriaId;
    if (id) this.id = id;
  }

  /** Método estático para listar todos os posts */
  public static async findAll(): Promise<Post[]> {
    const db = (await import("../Database/Database.js")).Database.getInstance();
    const rows = await db.all("SELECT * FROM posts");
    return rows.map(
      (row: any) =>
        new Post(row.titulo, row.conteudo, row.autorId, row.categoriaId, row.id)
    );
  }
}
