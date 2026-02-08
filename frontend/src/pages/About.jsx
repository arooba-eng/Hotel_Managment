import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <Box sx={{ py: 15 }}>
            <Container maxWidth="lg">
                <Grid container spacing={10} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                                OUR STORY
                            </Typography>
                            <Typography variant="h2" sx={{ my: 3, fontWeight: 800 }}>Defined by Quality, Driven by Passion.</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
                                Founded in 2024, LuxuryStay Hospitality was born from a simple vision: to create a sanctuary where modern luxury meets environmental mindfulness. We don't just provide a room; we provide an experience that rejuvenates the soul.
                            </Typography>
                            <Stack direction="row" spacing={4}>
                                <Box>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>15+</Typography>
                                    <Typography variant="body2" color="text.secondary">Global Locations</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>300k</Typography>
                                    <Typography variant="body2" color="text.secondary">Happy Guests</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>50+</Typography>
                                    <Typography variant="body2" color="text.secondary">Expert Chefs</Typography>
                                </Box>
                            </Stack>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 500,
                                width: '100%',
                                borderRadius: 10,
                                overflow: 'hidden',
                                boxShadow: '0 30px 60px rgba(52, 78, 65, 0.2)'
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000"
                                alt="About LuxuryStay"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
