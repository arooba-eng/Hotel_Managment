const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Room',
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['unpaid', 'paid'],
            default: 'unpaid',
        },
        actualCheckIn: {
            type: Date,
        },
        actualCheckOut: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
