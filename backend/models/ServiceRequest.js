const mongoose = require('mongoose');

const serviceRequestSchema = mongoose.Schema(
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
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Booking',
        },
        serviceType: {
            type: String,
            required: true,
            enum: ['room-service', 'laundry', 'transportation', 'spa', 'wake-up-call', 'other'],
        },
        details: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'preparing', 'delivered', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
