const mongoose = require('mongoose');

const housekeepingTaskSchema = mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Room',
        },
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        taskType: {
            type: String,
            required: true,
            enum: ['regular', 'deep-clean', 'maintenance-ready'],
            default: 'regular',
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
        priority: {
            type: String,
            required: true,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const HousekeepingTask = mongoose.model('HousekeepingTask', housekeepingTaskSchema);

module.exports = HousekeepingTask;
