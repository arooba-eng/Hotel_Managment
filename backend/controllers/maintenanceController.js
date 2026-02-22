const MaintenanceRequest = require('../models/MaintenanceRequest');
const Room = require('../models/Room');

// @desc    Get all maintenance requests
// @route   GET /api/maintenance
// @access  Private/Admin/Maintenance
const getRequests = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'maintenance') {
            query = { assignedStaff: req.user._id };
        }

        const requests = await MaintenanceRequest.find(query)
            .populate('room', 'roomNumber roomType')
            .populate('reportedBy', 'name email')
            .populate('assignedStaff', 'name email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a maintenance request
// @route   POST /api/maintenance
// @access  Private
const createRequest = async (req, res) => {
    try {
        const { room: roomId, issueDescription, priority, category } = req.body;

        const request = await MaintenanceRequest.create({
            room: roomId,
            reportedBy: req.user._id,
            issueDescription,
            priority,
            category,
        });

        // Set room status to maintenance
        await Room.findByIdAndUpdate(roomId, { status: 'maintenance' });

        res.status(201).json({
            message: 'Maintenance request reported successfully',
            request
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update maintenance status
// @route   PUT /api/maintenance/:id
// @access  Private/Admin/Maintenance
const updateRequest = async (req, res) => {
    try {
        const { status, assignedStaff, resolutionDetails } = req.body;
        const request = await MaintenanceRequest.findById(req.params.id);

        if (request) {
            request.status = status || request.status;
            request.assignedStaff = assignedStaff || request.assignedStaff;
            request.resolutionDetails = resolutionDetails || request.resolutionDetails;

            if (status === 'completed') {
                request.completedAt = Date.now();
                // Check if any other pending maintenance for this room
                const otherPending = await MaintenanceRequest.findOne({
                    room: request.room,
                    _id: { $ne: request._id },
                    status: { $ne: 'completed' }
                });

                if (!otherPending) {
                    // Room becomes available (or cleaning might be needed, for now available)
                    await Room.findByIdAndUpdate(request.room, { status: 'available' });
                }
            }

            const updatedRequest = await request.save();
            res.json({
                message: `Maintenance status updated to ${status}`,
                request: updatedRequest
            });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a request
// @route   DELETE /api/maintenance/:id
// @access  Private/Admin
const deleteRequest = async (req, res) => {
    try {
        const request = await MaintenanceRequest.findById(req.params.id);

        if (request) {
            await request.deleteOne();
            res.json({ message: 'Request removed' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRequests,
    createRequest,
    updateRequest,
    deleteRequest,
};
