const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask
} = require('../controllers/housekeepingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager', 'housekeeping'), getTasks)
    .post(protect, authorize('admin', 'manager'), createTask);

router.route('/:id')
    .put(protect, authorize('admin', 'manager', 'housekeeping'), updateTaskStatus)
    .delete(protect, authorize('admin', 'manager'), deleteTask);

module.exports = router;
