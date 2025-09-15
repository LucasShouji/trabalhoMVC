// src/Controllers/IndexController.ts
import { AbstractController } from "./AbstractController.js";

export class IndexController extends AbstractController {
  public async execute(): Promise<void> {
    this.res.json({ message: "Aplicação Blog" });
  }
}
