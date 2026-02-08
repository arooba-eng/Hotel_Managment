import { Box, Container, Typography, Grid, Stack, Button, Divider, Chip, Paper } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';

const RoomDetails = () => {
    // Mock data for a single room
    const room = {
        title: 'Presidential Ocean View',
        price: 550,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
        ],
        tag: 'Recommended',
        description: 'The Presidential Ocean View suite offers the ultimate luxury experience. Spanning over 1200 square feet, this suite features a private balcony, a master bedroom with a king-size bed, and a spacious living area. Guests can enjoy panoramic views of the ocean through floor-to-ceiling windows.',
        amenities: ['Free WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Safe', 'Smart TV']
    };

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Room Images */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ borderRadius: 6, overflow: 'hidden', height: { xs: 300, md: 500 } }}>
                            <img src={room.images[0]} alt={room.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                <Chip label={room.tag} color="secondary" size="small" sx={{ mb: 2, fontWeight: 700 }} />
                                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{room.title}</Typography>
                                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>${room.price}<span style={{ fontSize: '1rem', color: '#666' }}>/night</span></Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Description</Typography>
                                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    {room.description}
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

                            <Button variant="contained" size="large" sx={{ py: 2, borderRadius: 3, fontWeight: 700, mt: 3 }}>
                                Reserve This Room
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default RoomDetails;
