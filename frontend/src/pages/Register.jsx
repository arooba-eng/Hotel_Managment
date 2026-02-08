import { Box, Container, Paper, Typography, TextField, Button, Grid, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 10 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 6, border: '1px solid #e0e0e0' }}>
                    <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Begin Your Journey</Typography>
                            <Typography color="text.secondary">Join LuxuryStay and unlock exclusive benefits</Typography>
                        </Box>

                        <Stack spacing={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="First Name" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Last Name" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                </Grid>
                            </Grid>
                            <TextField fullWidth label="Email Address" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                            <TextField fullWidth label="Phone Number" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                            <TextField fullWidth label="Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                            <TextField fullWidth label="Confirm Password" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ py: 2, borderRadius: 3, fontWeight: 700 }}
                        >
                            Exlpore Membership
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account? {' '}
                                <Link component={RouterLink} to="/login" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                                    Log In
                                </Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Register;
