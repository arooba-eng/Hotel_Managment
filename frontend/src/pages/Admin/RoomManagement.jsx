import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, TextField,
    Select, MenuItem, FormControl, InputLabel, Stack, CircularProgress, Alert, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        roomNumber: '',
        roomType: 'Standard',
        pricePerNight: '',
        capacity: 2,
        amenities: '',
        description: ''
    });

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const { data } = await getRooms();
            setRooms(data);
        } catch (err) {
            setError('Failed to fetch rooms');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleOpen = (room = null) => {
        if (room) {
            setEditingId(room._id);
            setFormData({
                roomNumber: room.roomNumber,
                roomType: room.roomType,
                pricePerNight: room.pricePerNight,
                capacity: room.capacity,
                amenities: room.amenities.join(', '),
                description: room.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({
                roomNumber: '',
                roomType: 'Standard',
                pricePerNight: '',
                capacity: 2,
                amenities: '',
                description: ''
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                amenities: formData.amenities.split(',').map(item => item.trim())
            };

            if (editingId) {
                await updateRoom(editingId, payload);
            } else {
                await createRoom(payload);
            }
            handleClose();
            fetchRooms();
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this room?')) {
            try {
                await deleteRoom(id);
                fetchRooms();
            } catch (err) {
                setError('Delete failed');
            }
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Room Management</Typography>
                    <Typography variant="body2" color="text.secondary">Configure and manage hotel inventory.</Typography>
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                    onClick={() => handleOpen()}
                    sx={{ px: 2, py: 1, borderRadius: 1.5 }}
                >
                    Add Room
                </Button>
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5, py: 0 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.03)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>No.</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room._id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{room.roomNumber}</TableCell>
                                <TableCell>{room.roomType}</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>${room.pricePerNight}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={room.status.toUpperCase()}
                                        size="small"
                                        color={room.status === 'available' ? 'success' : room.status === 'occupied' ? 'error' : 'warning'}
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                        <IconButton size="small" color="primary" onClick={() => handleOpen(room)} sx={{ p: 0.5 }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(room._id)} sx={{ p: 0.5 }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                        {editingId ? 'Edit Room' : 'Add New Room'}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth size="small" label="Room Number" value={formData.roomNumber} onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Type</InputLabel>
                                <Select label="Type" value={formData.roomType} onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}>
                                    <MenuItem value="Standard">Standard</MenuItem>
                                    <MenuItem value="Deluxe">Deluxe</MenuItem>
                                    <MenuItem value="Suite">Suite</MenuItem>
                                    <MenuItem value="Penthouse">Penthouse</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth size="small" type="number" label="Price per Night" value={formData.pricePerNight} onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth size="small" type="number" label="Capacity" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Amenities (comma separated)" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" multiline rows={2} label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, pt: 2, display: 'flex', gap: 1 }}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ borderRadius: 1.5 }}>
                            {editingId ? 'Update Room' : 'Create Room'}
                        </Button>
                        <Button fullWidth variant="outlined" onClick={handleClose} sx={{ borderRadius: 1.5 }}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default RoomManagement;
