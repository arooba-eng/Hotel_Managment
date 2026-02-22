import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Chip, Stack, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarsIcon from '@mui/icons-material/Stars';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from '../api';

const Home = () => {
    const [featuredRooms, setFeaturedRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await getRooms();
                setFeaturedRooms(data.slice(0, 3)); // Just show first 3 for featured
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    height: '80vh',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.5
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="overline" sx={{ color: 'secondary.light', fontWeight: 700, letterSpacing: 3 }}>
                            WELCOME TO LUXURYSTAY
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                color: '#ffffff',
                                fontSize: { xs: '3rem', md: '5rem' },
                                lineHeight: 1.1,
                                mb: 3,
                                mt: 1,
                                maxWidth: 800
                            }}
                        >
                            Where Nature Meets <span style={{ color: '#a3b18a' }}>Elegance</span>.
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ color: 'rgba(255,255,255,0.8)', mb: 5, maxWidth: 600, fontWeight: 400 }}
                        >
                            Experience a minimalist retreat in our eco-luxury hospitality chain. Designed for those who seek peace without compromising on premium comfort.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ bgcolor: 'secondary.main', px: 4, py: 2 }}
                                onClick={() => navigate('/rooms')}
                            >
                                Explore Rooms
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ borderColor: '#ffffff', color: '#ffffff', px: 4, py: 2 }}
                                onClick={() => navigate('/about')}
                            >
                                Our Story
                            </Button>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>

            {/* Featured Section */}
            <Container maxWidth="lg" sx={{ py: 15 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 6 }}>
                    <Box>
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
                            OUR CURATED SPACES
                        </Typography>
                        <Typography variant="h2" sx={{ mt: 1 }}>Featured Accommodations</Typography>
                    </Box>
                    <Button color="primary" sx={{ fontWeight: 700 }} onClick={() => navigate('/rooms')}>View All Rooms</Button>
                </Stack>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
                ) : (
                    <Grid container spacing={4}>
                        {featuredRooms.map((room) => (
                            <Grid item xs={12} sm={6} md={4} key={room._id}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card sx={{ borderRadius: 4, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={room.image || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'}
                                            alt={room.roomType}
                                        />
                                        <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                                <Chip label={room.status.toUpperCase()} size="small" sx={{ bgcolor: 'background.default', color: 'primary.main', fontWeight: 600 }} />
                                                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>${room.pricePerNight}<span style={{ fontSize: '0.8rem', opacity: 0.6 }}>/night</span></Typography>
                                            </Stack>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{room.roomType}</Typography>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{ borderRadius: 2, mt: 'auto' }}
                                                onClick={() => navigate(`/rooms/${room._id}`)}
                                            >
                                                Book Now
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            {/* Philosophy Section */}
            <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 15 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <StarsIcon sx={{ fontSize: 60, color: 'secondary.light', mb: 3 }} />
                    <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>"A sanctuary where every detail is whispered, not shouted."</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, fontSize: '1.2rem', fontStyle: 'italic' }}>
                        Our philosophy is built on the concept of 'Less is More'. We believe in sustainable luxury that respects our environment while providing a home away from home.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
