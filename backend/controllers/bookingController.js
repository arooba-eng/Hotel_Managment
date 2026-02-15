const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { room: roomId, checkInDate, checkOutDate, totalAmount } = req.body;

        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.status !== 'available') {
            return res.status(400).json({ message: 'Room is not available' });
        }

        const booking = await Booking.create({
            guest: req.user._id,
            room: roomId,
            checkInDate,
            checkOutDate,
            totalAmount,
        });

        // Update room status to occupied if needed immediately, or handle via check-in
        // For now, let's keep room status change for check-in process

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('guest', 'name email').populate('room', 'roomNumber roomType');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ guest: req.user._id }).populate('room', 'roomNumber roomType');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('guest', 'name email')
            .populate('room', 'roomNumber roomType');

        if (booking) {
            // Only allow user who booked or admin/staff
            if (booking.guest._id.toString() === req.user._id.toString() || ['admin', 'manager', 'receptionist'].includes(req.user.role)) {
                res.json(booking);
            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.status = status || booking.status;

            if (status === 'checked-in') {
                booking.actualCheckIn = Date.now();
                // Update Room status
                await Room.findByIdAndUpdate(booking.room, { status: 'occupied' });
            }

            if (status === 'checked-out') {
                booking.actualCheckOut = Date.now();
                // Update Room status to cleaning
                await Room.findByIdAndUpdate(booking.room, { status: 'cleaning' });
            }

            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getMyBookings,
    getBookingById,
    updateBookingStatus,
};
