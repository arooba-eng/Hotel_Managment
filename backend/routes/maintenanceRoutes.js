const express = require('express');
const router = express.Router();
const {
    getRequests,
    createRequest,
    updateRequest,
    deleteRequest
} = require('../controllers/maintenanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager', 'maintenance'), getRequests)
    .post(protect, createRequest);

router.route('/:id')
    .put(protect, authorize('admin', 'manager', 'maintenance'), updateRequest)
    .delete(protect, authorize('admin', 'manager'), deleteRequest);

module.exports = router;
