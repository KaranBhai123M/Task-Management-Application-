const express = require("express");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const { findUserByEmail } = require("../models/data");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "dev_secret";

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const user = findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash))
    return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
  const { passwordHash, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

module.exports = router;
