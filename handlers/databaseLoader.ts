import Database from "bun:sqlite";
import { QuickDB } from "quick.db";

const db = new Database("./data/database.sqlite");

class BunDBDriver {
  async prepare(table: string) {
    db.query(
      `CREATE TABLE IF NOT EXISTS ${table} (ID TEXT PRIMARY KEY, json TEXT)`
    ).run();
  }

  async getAllRows(table: string): Promise<
    {
      id: string;
      value: any;
    }[]
  > {
    const rows = db.query(`SELECT * FROM ${table}`).all() as {
      ID: string;
      json: string;
    }[];
    return rows.map((row) => ({
      id: row.ID,
      value: JSON.parse(row.json),
    }));
  }

  async getRowByKey<T>(
    table: string,
    key: string
  ): Promise<[T | null, boolean]> {
    const value = db
      .prepare(`SELECT json FROM ${table} WHERE ID = ?`)
      .all(key)[0] as { id: string; json: string };
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
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(key);
    return 0;
  }
}

export default new QuickDB({ driver: new BunDBDriver() });
