import { Box, Container, Paper, Typography, TextField, Button, Grid, Link, Stack, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { register as registerUserAPI } from '../api';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError('');
            // Combine first and last name for the backend
            const payload = {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password,
                phone: data.phone
            };
            const { data: userData } = await registerUserAPI(payload);
            localStorage.setItem('userInfo', JSON.stringify(userData));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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

                        {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            {...register('firstName', { required: 'First name is required' })}
                                            error={!!errors.firstName}
                                            helperText={errors.firstName?.message}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            {...register('lastName', { required: 'Last name is required' })}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName?.message}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    label="Email Address"
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
                                    label="Phone Number"
                                    {...register('phone')}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    {...register('confirmPassword', {
                                        validate: value => value === password || 'Passwords do not match'
                                    })}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                    sx={{ py: 2, borderRadius: 3, fontWeight: 700, mt: 2 }}
                                >
                                    {loading ? 'Creating Account...' : 'Explore Membership'}
                                </Button>
                            </Stack>
                        </form>

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
