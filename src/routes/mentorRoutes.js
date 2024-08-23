// src/routes/mentorRoutes.js

const express = require('express');
const { getMentors, bookSession } = require('../controllers/mentorController');
const { updateMentorAvailability } = require('../controllers/mentorController');
const router = express.Router();

router.get('/', getMentors);
router.post('/book', bookSession);
router.put('/availability', updateMentorAvailability);

module.exports = router;
