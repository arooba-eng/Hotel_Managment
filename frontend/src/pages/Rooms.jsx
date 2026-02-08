import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, Stack, TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const Rooms = () => {
    const allRooms = [
        { id: 1, title: 'Deluxe Garden Suite', price: '250', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800', tag: 'Eco-Friendly', desc: 'A spacious suite with direct access to our organic gardens.' },
        { id: 2, title: 'Presidential Ocean View', price: '550', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', tag: 'Premium', desc: 'Unmatched luxury with panoramic views of the Atlantic Ocean.' },
        { id: 3, title: 'Forest Retreat Lodge', price: '180', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800', tag: 'Peaceful', desc: 'Reconnect with nature in our modern log cabin retreat.' },
        { id: 4, title: 'Sky Loft Penthouse', price: '700', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', tag: 'Exclusive', desc: 'Urban elegance with private rooftop terrace and infinity pool.' },
        { id: 5, title: 'Classic Urban Room', price: '120', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', tag: 'Minimal', desc: 'Simple, clean design for the busy professional traveler.' },
        { id: 6, title: 'Wellness Spa Suite', price: '320', image: 'https://images.unsplash.com/photo-1571508601891-ca5ac7a813c9?auto=format&fit=crop&q=80&w=800', tag: 'Health', desc: 'Features private steam shower and aromatherapy system.' },
    ];

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

                {/* Filters */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6 }}>
                    <TextField
                        fullWidth
                        placeholder="Search rooms..."
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
                    {allRooms.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card sx={{ borderRadius: 5, border: '1px solid rgba(0,0,0,0.05)' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="260"
                                            image={room.image}
                                            alt={room.title}
                                        />
                                        <Chip
                                            label={room.tag}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                backdropFilter: 'blur(4px)',
                                                color: 'primary.main',
                                                fontWeight: 700
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ p: 3 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{room.title}</Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                                                ${room.price}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, height: 40, overflow: 'hidden' }}>
                                            {room.desc}
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Button fullWidth variant="contained" sx={{ borderRadius: 2 }}>Details</Button>
                                            <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>Book</Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Rooms;
