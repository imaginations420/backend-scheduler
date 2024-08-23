// src/controllers/mentorController.js

const db = require('../database');

// Retrieve all mentors
const getMentors = (req, res) => {
  const query = 'SELECT * FROM mentors';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve mentors.' });
    }
    res.json({ mentors: rows });
  });
};

// Book a session
const bookSession = (req, res) => {
  const { user_id, mentor_id, date, time } = req.body;
  const query = 'INSERT INTO bookings (user_id, mentor_id, date, time) VALUES (?, ?, ?, ?)';

  db.run(query, [user_id, mentor_id, date, time], function (err) {
    if (err) {
      return res.status(400).json({ error: 'Booking failed.' });
    }
    res.status(201).json({ id: this.lastID });
  });
};

// src/controllers/mentorController.js

// Update mentor availability
const updateMentorAvailability = (req, res) => {
    const { mentor_id, available_dates, expertise } = req.body;
  
    const query = 'UPDATE mentors SET available_dates = ?, expertise = ? WHERE id = ?';
  
    db.run(query, [available_dates, expertise, mentor_id], function (err) {
      if (err) {
        return res.status(400).json({ error: 'Failed to update mentor availability.' });
      }
      res.json({ message: 'Mentor availability updated successfully.' });
    });
  };
  

module.exports = { getMentors, bookSession, updateMentorAvailability };

