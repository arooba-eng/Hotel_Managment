const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Invoice = require('../models/Invoice');

// @desc    Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            message: 'Login successful'
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};

// @desc    Register a new guest user (Public)
// @route   POST /api/users
const registerUser = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Role is strictly forced to 'guest' for public registration
    const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
        role: 'guest'
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            message: 'Account registered successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Create a new user/staff (Admin Only)
// @route   POST /api/users/staff
const createUserByAdmin = async (req, res) => {
    const { name, email, password, role, phone, address } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        address
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: 'User created successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            preferences: user.preferences,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.preferences = req.body.preferences || user.preferences;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get all users (Admin Only)
// @route   GET /api/users
const getUsers = async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    res.json(users);
};

// @desc    Delete user (Admin Only)
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
    const user = await User.findById(req.user.params?.id || req.params.id);

    if (user) {
        if (user.role === 'admin') {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update staff user (Admin Only)
// @route   PUT /api/users/staff/:id
const updateStaffUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.status = req.body.status || user.status;
        user.phone = req.body.phone || user.phone;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            message: 'User updated successfully'
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get Admin Dashboard Stats
// @route   GET /api/users/dashboard/stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const staffCount = await User.countDocuments({ role: { $ne: 'guest' } });
        const guestCount = await User.countDocuments({ role: 'guest' });

        const totalRooms = await Room.countDocuments();
        const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
        const occupancy = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

        const pendingMaintenance = await MaintenanceRequest.countDocuments({ status: { $ne: 'completed' } });

        // Calculate actual revenue from paid invoices
        const paidInvoices = await Invoice.find({ paymentStatus: 'paid' });
        const revenue = paidInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0);

        const recentBookings = await Booking.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('guest', 'name email')
            .populate('room', 'roomNumber');

        const stats = {
            totalUsers,
            staffCount,
            guestCount,
            revenue,
            occupancy: Math.round(occupancy),
            pendingMaintenance,
            recentBookings
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
};

module.exports = {
    authUser,
    registerUser,
    createUserByAdmin,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateStaffUser,
    getDashboardStats
};
