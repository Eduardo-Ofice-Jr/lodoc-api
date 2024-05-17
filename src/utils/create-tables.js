import { db } from "../lib/sqlite.js";

export const createTables = async () => {
    db.prepare(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT UNIQUE, password TEXT)"
    ).run();
}