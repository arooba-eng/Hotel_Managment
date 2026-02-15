import { Box, Container, Paper, Typography, TextField, Button, Grid, Link, Stack, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login } from '../api';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError('');
            const { data: userData } = await login(data);
            localStorage.setItem('userInfo', JSON.stringify(userData));

            // Role-based redirection (All Staff roles go to Admin Panel)
            const staffRoles = ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'];
            if (staffRoles.includes(userData.role)) {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

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

                        {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                    placeholder="email@example.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    {...register('password', { required: 'Password is required' })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                                <Box sx={{ textAlign: 'right' }}>
                                    <Link component={RouterLink} to="/" sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 600 }}>
                                        Forgot password?
                                    </Link>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                    sx={{ py: 2, borderRadius: 3, fontWeight: 700, mt: 2 }}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </Stack>
                        </form>

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
