const Room = require('../models/Room');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
    try {
        const { roomNumber, roomType, pricePerNight, capacity, amenities, description, images } = req.body;

        const roomExists = await Room.findOne({ roomNumber });

        if (roomExists) {
            return res.status(400).json({ message: 'Room already exists' });
        }

        const room = await Room.create({
            roomNumber,
            roomType,
            pricePerNight,
            capacity,
            amenities,
            description,
            images,
        });

        res.status(201).json({
            message: `Room ${room.roomNumber} created successfully`,
            room
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res) => {
    try {
        const { roomNumber, roomType, pricePerNight, capacity, amenities, description, images, status } = req.body;

        const room = await Room.findById(req.params.id);

        if (room) {
            room.roomNumber = roomNumber || room.roomNumber;
            room.roomType = roomType || room.roomType;
            room.pricePerNight = pricePerNight || room.pricePerNight;
            room.capacity = capacity || room.capacity;
            room.amenities = amenities || room.amenities;
            room.description = description || room.description;
            room.images = images || room.images;
            room.status = status || room.status;

            const updatedRoom = await room.save();
            res.json({
                message: `Room ${updatedRoom.roomNumber} updated successfully`,
                room: updatedRoom
            });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (room) {
            await room.deleteOne();
            res.json({ message: 'Room removed' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
};
