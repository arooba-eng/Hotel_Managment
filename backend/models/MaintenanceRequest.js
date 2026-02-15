const mongoose = require('mongoose');

const maintenanceRequestSchema = mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Room',
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Usually a staff member with 'maintenance' role or similar
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['reported', 'in-progress', 'resolved', 'cancelled'],
            default: 'reported',
        },
        priority: {
            type: String,
            required: true,
            enum: ['low', 'medium', 'high', 'emergency'],
            default: 'medium',
        },
        resolutionNotes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
