const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['booking', 'maintenance', 'service', 'system', 'feedback'],
            default: 'system',
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        relatedId: {
            type: mongoose.Schema.Types.ObjectId, // ID of Booking, MaintenanceRequest, etc.
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
