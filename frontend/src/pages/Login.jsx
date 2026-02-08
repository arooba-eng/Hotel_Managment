import { Box, Container, Paper, Typography, TextField, Button, Grid, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 15 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 6, border: '1px solid #e0e0e0' }}>
                    <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Welcome Back</Typography>
                            <Typography color="text.secondary">Enter your credentials to access your account</Typography>
                        </Box>

                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                placeholder="email@example.com"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                            <Box sx={{ textAlign: 'right' }}>
                                <Link component={RouterLink} to="/" sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 600 }}>
                                    Forgot password?
                                </Link>
                            </Box>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ py: 2, borderRadius: 3, fontWeight: 700 }}
                        >
                            Sign In
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account? {' '}
                                <Link component={RouterLink} to="/register" sx={{ color: 'secondary.main', fontWeight: 700 }}>
                                    Create Account
                                </Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login;
