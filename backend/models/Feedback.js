const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
    {
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
