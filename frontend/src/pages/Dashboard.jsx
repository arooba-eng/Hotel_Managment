import { Box, Container, Typography, Grid, Paper, Stack, Tab, Tabs, TextField, Button, Avatar, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import KingBedIcon from '@mui/icons-material/KingBed';

const UserDashboard = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
                                AS
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Arooba Shah</Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>Loyalty Member Since 2024</Typography>
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
                                            <TextField fullWidth label="Full Name" defaultValue="Arooba Shah" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Email Address" defaultValue="arooba@example.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Special Preferences" placeholder="e.g. Extra pillows, high floor, vegan meals" multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" sx={{ px: 4 }}>Save Changes</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Tab 2: Guest Services */}
                            {tabValue === 2 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Requests & Services</Typography>
                                    <Typography color="text.secondary" sx={{ mb: 4 }}>Make a request for your current or upcoming stay.</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { border: '1px solid #344e41', bgcolor: 'rgba(52, 78, 65, 0.05)' } }}>
                                                <RoomServiceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                                <Typography variant="h6">Room Service</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { border: '1px solid #344e41', bgcolor: 'rgba(52, 78, 65, 0.05)' } }}>
                                                <CleaningServicesIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                                <Typography variant="h6">Housekeeping</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { border: '1px solid #344e41', bgcolor: 'rgba(52, 78, 65, 0.05)' } }}>
                                                <LocalTaxiIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                                <Typography variant="h6">Transportation</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, textAlign: 'center', cursor: 'pointer', '&:hover': { border: '1px solid #344e41', bgcolor: 'rgba(52, 78, 65, 0.05)' } }}>
                                                <RateReviewIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                                <Typography variant="h6">Spa Booking</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Tab 3: Feedback */}
                            {tabValue === 3 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Guest Feedback</Typography>
                                    <Typography color="text.secondary" sx={{ mb: 4 }}>Your opinion helps us redefine luxury.</Typography>
                                    <Stack spacing={3}>
                                        <TextField fullWidth label="Service Rating" select SelectProps={{ native: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                                            <option value="5">Excellent - 5 Stars</option>
                                            <option value="4">Great - 4 Stars</option>
                                            <option value="3">Average - 3 Stars</option>
                                        </TextField>
                                        <TextField fullWidth label="Share your experience" multiline rows={4} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                        <Button variant="contained" sx={{ px: 4 }}>Submit Review</Button>
                                    </Stack>
                                </Box>
                            )}

                            {tabValue === 1 && (
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Recent Stays</Typography>
                                    <List>
                                        <ListItem sx={{ bgcolor: 'background.default', borderRadius: 4, mb: 2 }}>
                                            <ListItemIcon><Box sx={{ bgcolor: 'secondary.light', p: 1, borderRadius: 2 }}><KingBedIcon color="primary" /></Box></ListItemIcon>
                                            <ListItemText primary="Deluxe Garden Suite" secondary="Oct 12 - Oct 15, 2024" />
                                            <Typography variant="button" sx={{ color: 'success.main', fontWeight: 700 }}>Completed</Typography>
                                        </ListItem>
                                        <ListItem sx={{ bgcolor: 'background.default', borderRadius: 4, mb: 2 }}>
                                            <ListItemIcon><Box sx={{ bgcolor: 'secondary.light', p: 1, borderRadius: 2 }}><KingBedIcon color="primary" /></Box></ListItemIcon>
                                            <ListItemText primary="Wellness Spa Suite" secondary="Dec 24 - Dec 26, 2024" />
                                            <Typography variant="button" sx={{ color: 'primary.main', fontWeight: 700 }}>Upcoming</Typography>
                                        </ListItem>
                                    </List>
                                </Box>
                            )}

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default UserDashboard;
