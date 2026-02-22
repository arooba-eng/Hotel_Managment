const Feedback = require('../models/Feedback');

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private/Admin
const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({})
            .populate('guest', 'name email')
            .populate('booking', 'room checkInDate checkOutDate');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = async (req, res) => {
    try {
        const { rating, comment, isPublic, bookingId } = req.body;

        const feedback = await Feedback.create({
            guest: req.user._id,
            booking: bookingId,
            rating,
            comment,
            isPublic: isPublic || false,
        });

        res.status(201).json({
            message: 'Thank you for your feedback!',
            feedback
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update feedback visibility
// @route   PUT /api/feedback/:id/visibility
// @access  Private/Admin
const updateFeedbackVisibility = async (req, res) => {
    try {
        const { isPublic } = req.body;
        const feedback = await Feedback.findById(req.params.id);

        if (feedback) {
            feedback.isPublic = isPublic !== undefined ? isPublic : feedback.isPublic;
            await feedback.save();
            res.json({ message: 'Feedback visibility updated' });
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFeedback,
    submitFeedback,
    updateFeedbackVisibility,
};
