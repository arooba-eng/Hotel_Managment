import { Box, Container, Typography, Grid, Stack, Button, Divider, Chip, Paper, CircularProgress, Alert, Modal, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { getRoomById, createBooking } from '../api';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1
    });

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await getRoomById(id);
                setRoom(data);
            } catch (err) {
                setError('Could not load room details.');
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id]);

    const handleBookingClick = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
            return;
        }
        setOpenModal(true);
    };

    const handleConfirmBooking = async () => {
        try {
            const days = Math.ceil((new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24));
            if (days <= 0) {
                alert('Check-out date must be after check-in date');
                return;
            }

            await createBooking({
                room: room._id,
                checkInDate: bookingData.checkInDate,
                checkOutDate: bookingData.checkOutDate,
                totalAmount: days * room.pricePerNight
            });

            setOpenModal(false);
            navigate('/dashboard');
        } catch (err) {
            // Error toast handled by interceptor
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress /></Box>;
    if (error) return <Container sx={{ py: 10 }}><Alert severity="error">{error}</Alert></Container>;

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Room Images */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ borderRadius: 6, overflow: 'hidden', height: { xs: 300, md: 500 } }}>
                            <img src={room.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200'} alt={room.roomType} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={4}>
                                <Box sx={{ borderRadius: 2, overflow: 'hidden', height: 100 }}>
                                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400" alt="Room detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ borderRadius: 2, overflow: 'hidden', height: 100 }}>
                                    <img src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=400" alt="Room detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ borderRadius: 2, overflow: 'hidden', height: 100 }}>
                                    <img src="https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=400" alt="Room detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Room Info & Booking */}
                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            <Box>
                                <Chip label={room.status === 'available' ? 'Available Now' : 'Occupied'} color={room.status === 'available' ? 'success' : 'warning'} size="small" sx={{ mb: 2, fontWeight: 700 }} />
                                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{room.roomType}</Typography>
                                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>${room.pricePerNight}<span style={{ fontSize: '1rem', color: '#666' }}>/night</span></Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Located on Floor: {room.floor} • Room Number: {room.roomNumber}</Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Description</Typography>
                                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Experience pure luxury in our {room.roomType}. Each room is designed with the highest quality materials and attention to detail, providing an oasis of calm for our guests. Enjoy the premium amenities and the dedicated service that LuxuryStay is known for.
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>House Rules</Typography>
                                <Stack direction="row" spacing={4}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Check-in:</Typography>
                                        <Typography variant="body2">02:00 PM</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Check-out:</Typography>
                                        <Typography variant="body2">11:00 AM</Typography>
                                    </Stack>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Amenities</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}><Stack direction="row" spacing={1}><WifiIcon fontSize="small" color="primary" /><Typography variant="body2">Free WiFi</Typography></Stack></Grid>
                                    <Grid item xs={6}><Stack direction="row" spacing={1}><AcUnitIcon fontSize="small" color="primary" /><Typography variant="body2">AC</Typography></Stack></Grid>
                                    <Grid item xs={6}><Stack direction="row" spacing={1}><LocalBarIcon fontSize="small" color="primary" /><Typography variant="body2">Mini Bar</Typography></Stack></Grid>
                                    <Grid item xs={6}><Stack direction="row" spacing={1}><KingBedIcon fontSize="small" color="primary" /><Typography variant="body2">Master Bed</Typography></Stack></Grid>
                                </Grid>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ py: 2, borderRadius: 3, fontWeight: 700, mt: 3 }}
                                disabled={room.status !== 'available'}
                                onClick={handleBookingClick}
                            >
                                {room.status === 'available' ? 'Reserve This Room' : 'Room Occupied'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Booking Modal */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={modalStyle}>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Book Your Stay</Typography>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Check-in Date"
                                InputLabelProps={{ shrink: true }}
                                value={bookingData.checkInDate}
                                onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                type="date"
                                label="Check-out Date"
                                InputLabelProps={{ shrink: true }}
                                value={bookingData.checkOutDate}
                                onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Number of Guests"
                                value={bookingData.guests}
                                onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleConfirmBooking}
                                disabled={!bookingData.checkInDate || !bookingData.checkOutDate}
                            >
                                Confirm Reservation
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </Container>
        </Box>
    );
};

export default RoomDetails;
