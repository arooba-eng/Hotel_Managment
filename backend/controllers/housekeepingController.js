const HousekeepingTask = require('../models/HousekeepingTask');
const Room = require('../models/Room');

// @desc    Get all housekeeping tasks
// @route   GET /api/housekeeping
// @access  Private/Admin/Housekeeping
const getTasks = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'housekeeping') {
            query = { staff: req.user._id };
        }

        const tasks = await HousekeepingTask.find(query)
            .populate('room', 'roomNumber roomType status')
            .populate('staff', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a housekeeping task
// @route   POST /api/housekeeping
// @access  Private/Admin
const createTask = async (req, res) => {
    try {
        const { room: roomId, staff: staffId, taskType, priority, notes } = req.body;

        const task = await HousekeepingTask.create({
            room: roomId,
            staff: staffId,
            taskType,
            priority,
            notes,
        });

        // If a task is created, we might want to ensure room is in 'cleaning' status
        await Room.findByIdAndUpdate(roomId, { status: 'cleaning' });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task status
// @route   PUT /api/housekeeping/:id
// @access  Private/Admin/Housekeeping
const updateTaskStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const task = await HousekeepingTask.findById(req.params.id);

        if (task) {
            task.status = status || task.status;
            task.notes = notes || task.notes;

            if (status === 'completed') {
                // Once cleaning is done, room becomes available again
                await Room.findByIdAndUpdate(task.room, { status: 'available' });
            }

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/housekeeping/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
    try {
        const task = await HousekeepingTask.findById(req.params.id);

        if (task) {
            await task.deleteOne();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
};
