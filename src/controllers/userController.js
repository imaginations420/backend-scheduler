// src/controllers/userController.js

const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

// User registration
const registerUser = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

// User login
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

// Update user profile
const updateUserProfile = (req, res) => {
    const { email, newPassword } = req.body;
    const userId = req.user.id;
    
    let query = 'UPDATE users SET email = ?';
    const params = [email];
  
    if (newPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }
  
    query += ' WHERE id = ?';
    params.push(userId);
  
    db.run(query, params, function (err) {
      if (err) {
        return res.status(400).json({ error: 'Profile update failed.' });
      }
      res.json({ message: 'Profile updated successfully.' });
    });
  };

module.exports = { registerUser, loginUser, updateUserProfile };

