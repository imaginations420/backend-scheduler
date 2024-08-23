// src/routes/bookingRoutes.js

const express = require('express');
const { getUserBookings } = require('../controllers/bookingController');
const { getBookings } = require('../controllers/bookingController');
const {postUserBookings} = require('../controllers/bookingController');
const { cancelBooking } = require('../controllers/bookingController');
const { bookSession } = require('../controllers/bookingController');
const router = express.Router();

router.get('/:user_id', getUserBookings);
router.get('/', getBookings);
router.post("/", postUserBookings)
router.post("/", bookSession)
router.delete('/cancel/:booking_id', cancelBooking);

module.exports = router;
