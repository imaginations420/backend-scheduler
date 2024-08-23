// src/controllers/bookingController.js

const db = require('../database');

// Get bookings for a specific user
const getUserBookings = (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT b.id, m.name AS mentor_name, b.date, b.time
    FROM bookings b
    JOIN mentors m ON b.mentor_id = m.id
    WHERE b.user_id = ?`;

  db.all(query, [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve bookings.' });
    }
    res.json(rows);
  });
};

// Get all bookings for the authenticated user
const getBookings = (req, res) => {
  const user_id = req.user.id;
  const query = `
    SELECT b.id, m.name AS mentor_name, b.date, b.time
    FROM bookings b
    JOIN mentors m ON b.mentor_id = m.id
    WHERE b.user_id = ?`;

  db.all(query, [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve bookings.' });
    }
    res.json(rows);
  });
};

// Post bookings for the authenticated user
const postUserBookings = (req, res) => {
  const user_id = req.user.id;
  const query = `
    SELECT b.id, m.name AS mentor_name, b.date, b.time
    FROM bookings b
    JOIN mentors m ON b.mentor_id = m.id
    WHERE b.user_id = ?`;

  db.all(query, [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve bookings.' });
    }
    res.json(rows);
  });
};

// src/controllers/bookingController.js

// Cancel a booking
const cancelBooking = (req, res) => {
    const { booking_id } = req.params;
  
    const query = 'DELETE FROM bookings WHERE id = ? AND user_id = ?';
  
    db.run(query, [booking_id, req.user.id], function (err) {
      if (err) {
        return res.status(400).json({ error: 'Failed to cancel booking.' });
      }
      res.json({ message: 'Booking canceled successfully.' });
    });
  };

  


// Simulated cost calculation
const calculateCost = (isPremium, duration) => {
  const baseRate = 50; // Base rate per hour
  const premiumMultiplier = isPremium ? 1.5 : 1; // Premium mentors cost 50% more
  return baseRate * premiumMultiplier * duration;
};

// Simulate booking and payment
const bookSession = (req, res) => {
  const { user_id, mentor_id, date, time, duration } = req.body;

  // Get mentor details to determine if they are premium
  const mentorQuery = 'SELECT is_premium FROM mentors WHERE id = ?';
  db.get(mentorQuery, [mentor_id], (err, mentor) => {
    if (err || !mentor) {
      return res.status(500).json({ error: 'Mentor not found.' });
    }

    const isPremium = mentor.is_premium;
    const cost = calculateCost(isPremium, duration);

    // Simulate payment processing (e.g., always succeed)
    console.log(`Simulated payment of $${cost} for booking with mentor ${mentor_id}`);

    // Insert booking into the database
    const query = 'INSERT INTO bookings (user_id, mentor_id, date, time) VALUES (?, ?, ?, ?)';
    db.run(query, [user_id, mentor_id, date, time], function (err) {
      if (err) {
        return res.status(400).json({ error: 'Booking failed.' });
      }
      res.status(201).json({ id: this.lastID, message: `Payment of $${cost} simulated successfully.` });
    });
  });
};



  

module.exports = { getUserBookings, getBookings, postUserBookings, cancelBooking, bookSession };

