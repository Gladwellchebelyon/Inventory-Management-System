const sqlite3 = require('sqlite3').verbose();

// Create a database connection
const db = new sqlite3.Database('./database/inventory.db');

// Create a table for products
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL
        );
    `);
});

module.exports = db;

