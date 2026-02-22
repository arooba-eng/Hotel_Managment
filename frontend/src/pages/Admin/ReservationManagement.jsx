import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, Select, MenuItem,
    FormControl, InputLabel, Stack, CircularProgress, Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getBookings, updateBookingStatus, generateInvoice } from '../../api';

const ReservationManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data } = await getBookings();
            setBookings(data);
        } catch (err) {
            setError('Failed to load reservations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateBookingStatus(id, status);

            // Automatically generate invoice on check-out
            if (status === 'checked-out') {
                try {
                    await generateInvoice(id);
                } catch (invErr) {
                    console.error("Invoice generation skipped or already exists", invErr);
                }
            }

            fetchBookings();
        } catch (err) {
            setError('Status update failed');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Reservations</Typography>
                <Typography variant="body2" color="text.secondary">Manage guest check-ins, check-outs and booking status.</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5, py: 0 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.03)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Guest</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Room</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Dates</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking._id} hover>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{booking.guest?.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{booking.guest?.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip label={booking.room?.roomNumber} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>{booking.room?.roomType}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption" sx={{ display: 'block' }}>IN: {new Date(booking.checkInDate).toLocaleDateString()}</Typography>
                                    <Typography variant="caption" sx={{ display: 'block' }}>OUT: {new Date(booking.checkOutDate).toLocaleDateString()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={booking.status.toUpperCase()}
                                        size="small"
                                        color={booking.status === 'confirmed' ? 'primary' : booking.status === 'checked-in' ? 'success' : 'default'}
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                        {booking.status === 'confirmed' && (
                                            <Button size="small" variant="outlined" color="success" startIcon={<CheckCircleOutlineIcon />} onClick={() => handleStatusUpdate(booking._id, 'checked-in')} sx={{ fontSize: '0.65rem', py: 0 }}>Check-In</Button>
                                        )}
                                        {booking.status === 'checked-in' && (
                                            <Button size="small" variant="outlined" color="error" startIcon={<ExitToAppIcon />} onClick={() => handleStatusUpdate(booking._id, 'checked-out')} sx={{ fontSize: '0.65rem', py: 0 }}>Check-Out</Button>
                                        )}
                                        <IconButton size="small"><VisibilityIcon sx={{ fontSize: 16 }} /></IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReservationManagement;
