import { Box, Container, Typography, Grid, Paper, TextField, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
    return (
        <Box sx={{ py: 15 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                        GET IN TOUCH
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>We'd Love to Hear From You</Typography>
                    <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.7 }}>
                        Have questions about our rooms or services? Our team is available 24/7 to assist you.
                    </Typography>
                </Box>

                <Grid container spacing={6}>
                    <Grid item xs={12} md={5}>
                        <Stack spacing={4}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, bgcolor: 'primary.main', color: '#fff' }}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1.5, borderRadius: 3 }}>
                                        <EmailIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>Email Us</Typography>
                                        <Typography variant="h6">hello@luxurystay.com</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 3, color: 'primary.main' }}>
                                        <PhoneIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>Call Us</Typography>
                                        <Typography variant="h6">+1 (234) 567-890</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: 5, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 3, color: 'primary.main' }}>
                                        <LocationOnIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>Visit Us</Typography>
                                        <Typography variant="h6">123 Serenity Blvd, Forest Hills, CA</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 6, border: '1px solid #e0e0e0' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Send a Message</Typography>
                            <Stack spacing={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Full Name" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Email Address" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                    </Grid>
                                </Grid>
                                <TextField fullWidth label="Subject" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                <TextField fullWidth multiline rows={4} label="Your Message" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                <Button variant="contained" size="large" sx={{ py: 2, borderRadius: 3, fontWeight: 700 }}>
                                    Submit Inquiry
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;
