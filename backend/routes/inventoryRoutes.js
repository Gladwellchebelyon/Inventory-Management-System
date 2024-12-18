const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/inventory.db');

// Get all products
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new product
router.post('/', (req, res) => {
  const { name, quantity, price } = req.body;
  const sql = `INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)`;
  db.run(sql, [name, quantity, price], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, quantity, price });
  });
});

module.exports = router;




