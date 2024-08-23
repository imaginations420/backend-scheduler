// src/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET || 'backendnode2';

app.use(cors());
app.use(bodyParser.json());


// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Mount routes with authentication middleware where needed
app.use('/users', authenticateToken, userRoutes); // User registration and login don't need authentication
app.use('/mentors', authenticateToken, mentorRoutes);
app.use('/bookings', authenticateToken, bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});