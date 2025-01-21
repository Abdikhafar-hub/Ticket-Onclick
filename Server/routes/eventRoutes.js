// filepath: /home/abdikhafar/Desktop/Ticket_Onclick/server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/event', eventController.createEvent);
router.patch('/event/:id', eventController.updateEventCapacity);

module.exports = router;