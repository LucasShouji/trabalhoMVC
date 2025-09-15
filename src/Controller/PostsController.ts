// src/Controllers/PostsController.ts
import { AbstractController } from "./AbstractController.js";
import { Post } from "../Model/Post.js"; // você deve criar o modelo Post

export class PostsController extends AbstractController {
  public async execute(): Promise<void> {
    const method = this.getMethod();

    if (method === "GET") {
      // Exemplo: SELECT * FROM posts
      const posts = await Post.findAll();
      this.res.json(posts);
    } else {
      this.res.status(405).json({ error: "Método não permitido" });
    }
  }
}
