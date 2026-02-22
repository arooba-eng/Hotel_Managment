import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, Stack, TextField, InputAdornment, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from '../api';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await getRooms();
                // Filter to show only available or occupied rooms (not maintenance/cleaning for guests)
                setRooms(data.filter(room => ['available', 'occupied'].includes(room.status)));
            } catch (err) {
                setError('Failed to fetch rooms. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room =>
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomNumber.toString().includes(searchTerm)
    );

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                        CHOOSE YOUR SANCTUARY
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>Accommodations</Typography>
                    <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.7 }}>
                        Each space at LuxuryStay is carefully curated to provide the perfect balance of luxury, comfort, and sustainability.
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>{error}</Alert>}

                {/* Filters */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by room type (e.g. Deluxe, Suite)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="primary" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 4, bgcolor: '#fff' }
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        sx={{ borderRadius: 4, px: 4, whiteSpace: 'nowrap', borderColor: '#e0e0e0', color: 'primary.main' }}
                    >
                        Filter By
                    </Button>
                </Stack>

                <Grid container spacing={4}>
                    {filteredRooms.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room._id}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="260"
                                            image={room.image || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'}
                                            alt={room.roomType}
                                        />
                                        <Chip
                                            label={room.status.toUpperCase()}
                                            size="small"
                                            color={room.status === 'available' ? 'success' : 'warning'}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                fontWeight: 700
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{room.roomType}</Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                                                ${room.pricePerNight}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, height: 60, overflow: 'hidden' }}>
                                            Luxury {room.roomType} located on the {room.floor} floor. Experience high-end comfort in Room {room.roomNumber}.
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ borderRadius: 2 }}
                                                onClick={() => navigate(`/rooms/${room._id}`)}
                                            >
                                                Details
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{ borderRadius: 2 }}
                                                onClick={() => navigate(`/rooms/${room._id}`)}
                                                disabled={room.status !== 'available'}
                                            >
                                                {room.status === 'available' ? 'Book Now' : 'Occupied'}
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
                {filteredRooms.length === 0 && !loading && (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.secondary">No rooms found matching your search.</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Rooms;
