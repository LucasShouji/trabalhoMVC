// src/Model/AbstractModel.ts
import { Database } from "../Database/Database.js";

export abstract class AbstractModel {
  public id?: number;
  protected tableName: string;
  protected database: Database; // instância direta, não Promise

  constructor(tableName: string) {
    this.tableName = tableName;
    this.database = Database.getInstance(); // já vem instância
  }

  public async load(criteria: Record<string, any>): Promise<this | null> {
  const db = this.database;
  const keys = Object.keys(criteria);
  const values = Object.values(criteria);
  const where = keys.map(k => `${k} = ?`).join(" AND ");
  const row = await db.get(
    `SELECT * FROM ${this.tableName} WHERE ${where} LIMIT 1`,
    values
  );
  if (!row) return null;
  Object.assign(this, row);
  return this;
}

  public async save(): Promise<this> {
    const dataFields = Object.keys(this).filter(
      k => !["id", "tableName", "database"].includes(k)
    );
    const values = dataFields.map(f => (this as any)[f]);

    if (this.id) {
      const setClause = dataFields.map(f => `${f} = ?`).join(", ");
      await this.database.run(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
        [...values, this.id]
      );
    } else {
      const placeholders = dataFields.map(() => "?").join(", ");
      const result = await this.database.run(
        `INSERT INTO ${this.tableName} (${dataFields.join(",")}) VALUES (${placeholders})`,
        values
      );
      if (result && result.lastID !== undefined) this.id = result.lastID;
    }

    return this;
  }

  public async delete(): Promise<boolean> {
    if (!this.id) return false;
    const result = await this.database.run(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [this.id]
    );
    return !!(result && result.changes && result.changes > 0);
  }
}
