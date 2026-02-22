const express = require('express');
const router = express.Router();
const {
    getAllFeedback,
    submitFeedback,
    updateFeedbackVisibility,
} = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAllFeedback)
    .post(protect, submitFeedback);

router.route('/:id/visibility')
    .put(protect, admin, updateFeedbackVisibility);

module.exports = router;
