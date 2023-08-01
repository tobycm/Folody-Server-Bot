import { QuickDB, SqliteDriver } from "quick.db";

const sqlite = new SqliteDriver("./data/database.sqlite");

export default new QuickDB({ driver: sqlite });
