import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Grid, Card, CardContent,
    Rating, Avatar, Chip, Switch, FormControlLabel,
    CircularProgress, Alert, Stack, Divider
} from '@mui/material';
import { getAllFeedback, updateFeedbackVisibility } from '../../api';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await getAllFeedback();
            setFeedbacks(data);
        } catch (err) {
            setError('Failed to load guest feedback');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVisibilityToggle = async (id, currentStatus) => {
        try {
            await updateFeedbackVisibility(id, !currentStatus);
            fetchData();
        } catch (err) {
            setError('Failed to update visibility');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Guest Feedback</Typography>
                <Typography variant="body2" color="text.secondary">Monitor guest satisfaction and manage public reviews.</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>{error}</Alert>}

            <Grid container spacing={3}>
                {feedbacks.map((feedback) => (
                    <Grid item xs={12} md={6} lg={4} key={feedback._id}>
                        <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 4, height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar sx={{ bgcolor: 'secondary.main', fontWeight: 700 }}>
                                            {feedback.guest?.name?.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{feedback.guest?.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Rating value={feedback.rating} readOnly size="small" />
                                </Stack>

                                <Typography variant="body2" sx={{ mb: 3, fontStyle: 'italic', minHeight: 60 }}>
                                    "{feedback.comment}"
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="caption" display="block" color="text.secondary">Booking Reference</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                            Room {feedback.booking?.room?.roomNumber || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                size="small"
                                                checked={feedback.isPublic}
                                                onChange={() => handleVisibilityToggle(feedback._id, feedback.isPublic)}
                                            />
                                        }
                                        label={<Typography variant="caption" sx={{ fontWeight: 700 }}>Public</Typography>}
                                        labelPlacement="start"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {feedbacks.length === 0 && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 5, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.01)', border: '1px dashed #ccc' }}>
                            <Typography color="text.secondary">No feedback found yet.</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default FeedbackManagement;
