const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
    {
        roomNumber: {
            type: String,
            required: true,
            unique: true,
        },
        roomType: {
            type: String, // e.g., Deluxe, Suite, Standard
            required: true,
        },
        pricePerNight: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        amenities: [String],
        description: {
            type: String,
        },
        images: [String],
        status: {
            type: String,
            enum: ['available', 'occupied', 'maintenance', 'cleaning'],
            default: 'available',
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
