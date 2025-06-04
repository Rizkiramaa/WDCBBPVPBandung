const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all items
router.get('/', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new item
router.post('/', (req, res) => {
  const { name, stock } = req.body;
  if (!name || stock == null) {
    return res.status(400).json({ error: 'Nama dan stok wajib diisi' });
  }
  db.run('INSERT INTO items (name, stock) VALUES (?, ?)', [name, stock], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

module.exports = router;
