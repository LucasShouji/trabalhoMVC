// src/Models/Tag.ts
import { AbstractModel } from "./AbstractModel.js";

export class Tag extends AbstractModel {
    public nome: string | undefined;


    constructor(nome?: string, id?: number) {
        super("tags");
        this.nome = nome;
        if (id !== undefined) this.id = id; // usa id do AbstractModel
    }
}

