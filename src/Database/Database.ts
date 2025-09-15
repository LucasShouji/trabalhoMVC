// src/Database/Database.ts
import sqlite3 from "sqlite3";
import { join } from "path";

export class Database {
  static connect() {
      throw new Error('Method not implemented.');
  }
  private static instance: Database;
  private db: sqlite3.Database;

  private constructor(filename = join(process.cwd(), "dev.db")) {
    sqlite3.verbose();
    this.db = new sqlite3.Database(filename, (err) => {
      if (err) console.error("Erro abrindo DB:", err);
      else console.log("SQLite conectado em", filename);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    });
  }

  public all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  }

  public run(sql: string, params: any[] = []): Promise<{ lastID?: number; changes?: number }> {
    return new Promise((resolve, reject) => {
      // função normal (não arrow) para preservar `this` do sqlite
      this.db.run(sql, params, function (this: any, err?: Error | null) {
        if (err) return reject(err);
        resolve({ lastID: this?.lastID, changes: this?.changes });
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => (err ? reject(err) : resolve()));
    });
  }
}
