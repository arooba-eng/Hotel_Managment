const express = require('express');
const router = express.Router();
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const { protect, admin, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getRooms)
    .post(protect, authorize('admin', 'manager'), createRoom);

router.route('/:id')
    .get(getRoomById)
    .put(protect, authorize('admin', 'manager'), updateRoom)
    .delete(protect, authorize('admin', 'manager'), deleteRoom);

module.exports = router;
