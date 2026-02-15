const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookings,
    getMyBookings,
    getBookingById,
    updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager', 'receptionist'), getBookings)
    .post(protect, createBooking);

router.get('/mybookings', protect, getMyBookings);

router.route('/:id')
    .get(protect, getBookingById);

router.put('/:id/status', protect, authorize('admin', 'manager', 'receptionist'), updateBookingStatus);

module.exports = router;
