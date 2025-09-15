// src/Models/Categoria.ts
import { Database } from "../Database/Database.js";
import { AbstractModel } from "./AbstractModel.js";

export class Categoria extends AbstractModel {
    static getDatabase() {
        throw new Error("Method not implemented.");
    }
    public nome: string;
    public descricao: string | undefined;

    constructor(nome: string, descricao?: string, id?: number) {
    super("categorias");
    this.nome = nome;
    this.descricao = descricao; 
    if (id) this.id = id;
}

public static async findAll(): Promise<Categoria[]> {
    const db = Database.getInstance(); // retorna a instância do DB
    const rows = await db.all("SELECT * FROM categorias");
    return rows.map((row: any) => new Categoria(row.nome, row.descricao, row.id));
  }
}
