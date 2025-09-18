const express = require('express');
const { Router } = express;
const { createBooking, getAll, deleteBooking, getBookingById } = require('../Controllers/BookingControllers');
const router = Router();

router.post('/createBooking', createBooking);
router.post('/getAll', getAll);
router.get('/deleteBooking/:BookingId', deleteBooking);
router.get('/getBookingById/:BookingId', getBookingById);


module.exports = router;

