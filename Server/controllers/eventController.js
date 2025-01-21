// filepath: /home/abdikhafar/Desktop/Ticket_Onclick/server/controllers/eventController.js
const Event = require('../models/eventModel');

exports.createEvent = (req, res) => {
  const eventData = req.body;
  Event.create(eventData, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(result);
  });
};

exports.updateEventCapacity = (req, res) => {
  const eventId = req.params.id;
  const newCapacity = req.body.capacity;
  Event.updateCapacity(eventId, newCapacity, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
};