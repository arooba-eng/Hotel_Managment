const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    createUserByAdmin,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    updateStaffUser,
    getDashboardStats
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

router.post('/login', authUser);

router.get('/dashboard/stats', protect, admin, getDashboardStats);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/staff', protect, admin, createUserByAdmin);
router.route('/staff/:id')
    .put(protect, admin, updateStaffUser)
    .delete(protect, admin, deleteUser);

module.exports = router;
