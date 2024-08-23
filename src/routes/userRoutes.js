// src/routes/userRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/:userId', updateUserProfile);

module.exports = router;
