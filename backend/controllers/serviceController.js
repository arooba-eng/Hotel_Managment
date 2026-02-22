const ServiceRequest = require('../models/ServiceRequest');
const Booking = require('../models/Booking');

// @desc    Get all service requests
// @route   GET /api/services
// @access  Private/Admin
const getServiceRequests = async (req, res) => {
    try {
        const services = await ServiceRequest.find({})
            .populate('guest', 'name email')
            .populate('room', 'roomNumber')
            .populate('booking', 'status');
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a service request
// @route   POST /api/services
// @access  Private
const createServiceRequest = async (req, res) => {
    try {
        const { bookingId, room, serviceType, details, cost } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const service = await ServiceRequest.create({
            guest: req.user._id,
            room,
            booking: bookingId,
            serviceType,
            details,
            cost: cost || 0,
        });

        res.status(201).json({
            message: 'Service request submitted successfully',
            service
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update service status
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateServiceStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const service = await ServiceRequest.findById(req.params.id);

        if (service) {
            service.status = status || service.status;
            const updatedService = await service.save();
            res.json({
                message: `Service status updated to ${status}`,
                service: updatedService
            });
        } else {
            res.status(404).json({ message: 'Service request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServiceRequests,
    createServiceRequest,
    updateServiceStatus,
};
