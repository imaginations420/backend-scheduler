// src/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const schema = fs.readFileSync(path.resolve(__dirname, 'models/schema.sql'), 'utf-8');

const dbPath = path.resolve(__dirname, 'scheduler.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Failed to initialize the database schema:', err.message);
      } else {
        console.log('Database schema initialized.');
      }
    });
  }
});

module.exports = db;

