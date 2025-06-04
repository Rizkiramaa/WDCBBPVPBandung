const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all loans
router.get('/', (req, res) => {
  db.all('SELECT * FROM loans', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new loan
router.post('/', (req, res) => {
  const { item_id, borrower, quantity, loan_date, return_date } = req.body;
  const stmt = `INSERT INTO loans (item_id, borrower, quantity, loan_date, return_date) VALUES (?, ?, ?, ?, ?)`;
  db.run(stmt, [item_id, borrower, quantity, loan_date, return_date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

module.exports = router;
