const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/inventory.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    borrower TEXT,
    quantity INTEGER,
    loan_date TEXT,
    return_date TEXT,
    FOREIGN KEY(item_id) REFERENCES items(id)
  )`);
});

module.exports = db;
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL
  )`);

  db.get("SELECT * FROM admins WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO admins (username, password) VALUES ('admin', 'admin123')");
    }
  });
});
