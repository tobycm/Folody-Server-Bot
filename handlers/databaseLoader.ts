import Database from "bun:sqlite";
import { QuickDB } from "quick.db";

const db = new Database("./data/database.sqlite");

interface Row {
  id: string;
  value: any;
}

class BunDBDriver {
  async getAllRows(table: string): Promise<Row[]> {
    return db.query(`SELECT * FROM ${table}`).all() as Row[];
  }

  async getRowByKey<T>(
    table: string,
    key: string
  ): Promise<[T | null, boolean]> {
    const value = db
      .query(`SELECT json FROM ${table} WHERE ID = ${key}`)
      .all()[0] as { id: string; json: string };
    return value != undefined
      ? [JSON.parse(value.json) as T, true]
      : [null, false];
  }

  async setRowByKey<T>(
    table: string,
    key: string,
    value: T,
    update: boolean
  ): Promise<T> {
    const stringifiedJson = JSON.stringify(value);
    if (update)
      db.prepare(`UPDATE ${table} SET json = (?) WHERE ID = (?)`).run(
        stringifiedJson,
        key
      );
    else
      db.prepare(`INSERT INTO ${table} (ID,json) VALUES (?,?)`).run(
        key,
        stringifiedJson
      );

    return value;
  }

  async deleteAllRows(table: string): Promise<number> {
    db.query(`DELETE FROM ${table}`).run();
    return 0; // TODO: check changes later
  }

  async deleteRowByKey(table: string, key: string): Promise<number> {
    db.query(`DELETE FROM ${table} WHERE id = ${key}`).run();
    return 0;
  }

  async prepare(table: string) {
    db.query(`CREATE TABLE IF NOT EXISTS ${table} (id TEXT, value TEXT)`).run();
  }
}

export default new QuickDB({ driver: new BunDBDriver() });
