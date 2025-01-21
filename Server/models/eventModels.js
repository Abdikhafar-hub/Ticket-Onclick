// filepath: server/models/eventModel.js
const db = require('../config/dbConfig');

const Event = {
  create: (eventData, callback) => {
    const query = 'INSERT INTO events SET ?';
    db.query(query, eventData, callback);
  },
  // Add more methods as needed
};

module.exports = Event;