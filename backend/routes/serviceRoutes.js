const express = require('express');
const router = express.Router();
const {
    getServiceRequests,
    createServiceRequest,
    updateServiceStatus,
} = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getServiceRequests)
    .post(protect, createServiceRequest);

router.route('/:id')
    .put(protect, updateServiceStatus);

module.exports = router;
