import { Box, Container, Typography, Grid, Paper, Stack, Tab, Tabs, TextField, Button, Avatar, Chip, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import KingBedIcon from '@mui/icons-material/KingBed';
import { getMyBookings, createServiceRequest, submitFeedback } from '../api';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

const UserDashboard = () => {
    const [tabValue, setTabValue] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [serviceDetails, setServiceDetails] = useState('');
    const [feedback, setFeedback] = useState({ rating: 5, comment: '', bookingId: '' });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUserInfo(JSON.parse(storedUser));
            fetchBookings();
        }
    }, [navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await getMyBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleServiceRequest = async () => {
        if (!bookings.length) {
            alert('You must have an active booking to request services');
            return;
        }
        try {
            const activeBooking = bookings[0]; // Simplified: use the latest booking
            await createServiceRequest({
                bookingId: activeBooking._id,
                room: activeBooking.room?._id,
                serviceType: selectedService,
                details: serviceDetails,
                cost: 20 // Standard charge for demo
            });
            setOpenServiceModal(false);
            setServiceDetails('');
        } catch (err) { }
    };

    const handleSubmitFeedback = async () => {
        try {
            await submitFeedback({
                ...feedback,
                bookingId: bookings[0]?._id
            });
            setFeedback({ rating: 5, comment: '', bookingId: '' });
        } catch (err) { }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress /></Box>;
    if (!userInfo) return null;

    return (
        <Box sx={{ py: 10, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Sidebar / Profile Summary */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, textAlign: 'center', border: '1px solid #e0e0e0' }}>
                            <Avatar
                                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
                            >
                                {userInfo.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{userInfo.name}</Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>{userInfo.role.toUpperCase()} Member</Typography>
                            <Chip label="Gold Member" color="secondary" size="small" sx={{ fontWeight: 700 }} />

                            <Box sx={{ mt: 4, textAlign: 'left' }}>
                                <Tabs
                                    orientation="vertical"
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    sx={{
                                        '& .MuiTabs-indicator': { left: 0, width: 4, borderRadius: 2 },
                                        '& .MuiTab-root': { alignItems: 'flex-start', textAlign: 'left', px: 2, borderRadius: 2, mb: 1 }
                                    }}
                                >
                                    <Tab icon={<PersonIcon />} iconPosition="start" label="Profile Details" />
                                    <Tab icon={<HistoryIcon />} iconPosition="start" label="Booking History" />
                                    <Tab icon={<RoomServiceIcon />} iconPosition="start" label="Guest Services" />
                                    <Tab icon={<RateReviewIcon />} iconPosition="start" label="My Feedback" />
                                </Tabs>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Main Content Area */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={0} sx={{ p: 6, borderRadius: 6, border: '1px solid #e0e0e0', minHeight: 500 }}>

                            {/* Tab 0: Profile Details */}
                            {tabValue === 0 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Guest Profile</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Full Name" defaultValue={userInfo.name} disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Email Address" defaultValue={userInfo.email} disabled sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Special Preferences" placeholder="e.g. Extra pillows, high floor" multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" sx={{ px: 4 }}>Update Preferences</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Tab 1: Booking History */}
                            {tabValue === 1 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Recent Stays</Typography>
                                    <List>
                                        {bookings.map((booking) => (
                                            <ListItem key={booking._id} sx={{ bgcolor: 'background.default', borderRadius: 4, mb: 2, border: '1px solid #eee' }}>
                                                <ListItemIcon><Box sx={{ bgcolor: 'secondary.light', p: 1, borderRadius: 2 }}><KingBedIcon color="primary" /></Box></ListItemIcon>
                                                <ListItemText
                                                    primary={booking.room?.roomType || 'Room'}
                                                    secondary={`${new Date(booking.checkInDate).toLocaleDateString()} - ${new Date(booking.checkOutDate).toLocaleDateString()}`}
                                                />
                                                <Chip
                                                    label={booking.status.toUpperCase()}
                                                    color={booking.status === 'confirmed' ? 'success' : 'default'}
                                                    size="small"
                                                    sx={{ fontWeight: 700 }}
                                                />
                                            </ListItem>
                                        ))}
                                        {bookings.length === 0 && (
                                            <Typography color="text.secondary">No bookings found. Start by exploring our rooms!</Typography>
                                        )}
                                    </List>
                                </Box>
                            )}

                            {/* Tab 2: Guest Services */}
                            {tabValue === 2 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Requests & Services</Typography>
                                    <Typography color="text.secondary" sx={{ mb: 4 }}>Make a request for your current or upcoming stay.</Typography>
                                    <Grid container spacing={3}>
                                        {[
                                            { type: 'room-service', label: 'Room Service', icon: <RoomServiceIcon /> },
                                            { type: 'laundry', label: 'Laundry Service', icon: <CleaningServicesIcon /> },
                                            { type: 'transportation', label: 'Transportation', icon: <LocalTaxiIcon /> },
                                            { type: 'wake-up-call', label: 'Wake-up Call', icon: <PersonIcon /> }
                                        ].map((service) => (
                                            <Grid item xs={12} sm={6} key={service.type}>
                                                <Paper
                                                    variant="outlined"
                                                    onClick={() => { setSelectedService(service.type); setOpenServiceModal(true); }}
                                                    sx={{ p: 3, borderRadius: 4, textAlign: 'center', cursor: 'pointer', transition: '0.3s', '&:hover': { border: '1px solid #344e41', bgcolor: 'rgba(52, 78, 65, 0.05)' } }}
                                                >
                                                    <Box sx={{ color: 'primary.main', mb: 1 }}>{service.icon}</Box>
                                                    <Typography variant="h6">{service.label}</Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}

                            {/* Tab 3: Feedback */}
                            {tabValue === 3 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Guest Feedback</Typography>
                                    <Typography color="text.secondary" sx={{ mb: 4 }}>Your opinion helps us redefine luxury.</Typography>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Service Rating"
                                            select
                                            SelectProps={{ native: true }}
                                            value={feedback.rating}
                                            onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        >
                                            <option value="5">Excellent - 5 Stars</option>
                                            <option value="4">Great - 4 Stars</option>
                                            <option value="3">Average - 3 Stars</option>
                                            <option value="2">Poor - 2 Stars</option>
                                            <option value="1">Terrible - 1 Star</option>
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            label="Share your experience"
                                            multiline
                                            rows={4}
                                            value={feedback.comment}
                                            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                        <Button variant="contained" sx={{ px: 4 }} onClick={handleSubmitFeedback}>Submit Review</Button>
                                    </Stack>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Service Request Modal */}
            <Modal open={openServiceModal} onClose={() => setOpenServiceModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Request {selectedService.replace('-', ' ')}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Please provide any specific instructions for our staff.</Typography>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="e.g. Please bring two extra pillows"
                            value={serviceDetails}
                            onChange={(e) => setServiceDetails(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleServiceRequest}
                            disabled={!serviceDetails}
                        >
                            Send Request
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserDashboard;
