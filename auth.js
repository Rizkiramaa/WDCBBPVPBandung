const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    'SELECT * FROM admins WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: 'Login gagal' });
      res.json({ success: true, message: 'Login berhasil' });
    }
  );
});

module.exports = router;
