const express = require('express');
const { Router } = express;
const { createEvent, updateEvent, getAllEvents, deleteEvent, getEventById } = require('../Controllers/EventControllers');
const router = Router();

router.post('/createEvent', createEvent);
router.post('/updateEvent', updateEvent);
router.get('/getAllEvents', getAllEvents);
router.get('/deleteEvent/:EventId', deleteEvent);
router.get('/getEventById/:EventId', getEventById);


module.exports = router;