// src/Models/Autor.ts
import { AbstractModel } from "./AbstractModel.js";

export class Autor extends AbstractModel {
    static getAll() {
        throw new Error("Method not implemented.");
    }
    static findAll() {
        throw new Error("Method not implemented.");
    }
    public nome: string;
    public email: string | undefined;

    constructor(nome: string, email?: string, id?: number) {
        super("autores");
        this.nome = nome;
        this.email = email;
        if (id) this.id = id; 
    }
}