import { Grid, Paper, Typography, Box, Stack, Card, CardContent, Divider, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../api';

const StatCard = ({ title, value, icon, color, trend }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Box sx={{ position: 'absolute', top: -5, right: -5, opacity: 0.05 }}>
            {icon}
        </Box>
        <CardContent sx={{ p: '16px !important' }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}.light`, color: `${color}.main`, display: 'flex' }}>
                    {icon}
                </Box>
                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>{title}</Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>{value}</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
                <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>{trend}</Typography>
                <Typography variant="caption" color="text.secondary">vs last week</Typography>
            </Stack>
        </CardContent>
    </Card>
);

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getDashboardStats();
                setStatsData(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isExecutive = ['admin', 'manager'].includes(userInfo?.role);

    const stats = [
        { title: 'Total Revenue', value: statsData ? `$${statsData.revenue.toLocaleString()}` : '-', icon: <TrendingUpIcon sx={{ fontSize: 20 }} />, color: 'secondary', trend: '12%', hidden: !isExecutive },
        { title: 'Room Occupancy', value: statsData ? `${statsData.occupancy}%` : '-', icon: <MeetingRoomIcon sx={{ fontSize: 20 }} />, color: 'primary', trend: '5%', hidden: !isExecutive },
        { title: 'Total Guests', value: statsData ? statsData.guestCount : '-', icon: <PeopleIcon sx={{ fontSize: 20 }} />, color: 'secondary', trend: '8%', hidden: false },
        { title: 'Staff Active', value: statsData ? statsData.staffCount : '-', icon: <CleaningServicesIcon sx={{ fontSize: 20 }} />, color: 'primary', trend: 'Live', hidden: false },
    ];

    const filteredStats = stats.filter(s => !s.hidden);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress color="primary" size={30} />
        </Box>
    );

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {isExecutive ? 'Executive Dashboard' : 'Staff Dashboard'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isExecutive ? 'Real-time financial and operational overview.' : 'Overview of daily hotel operations.'}
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {filteredStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={isExecutive ? 3 : 6} key={index}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <StatCard {...stat} />
                        </motion.div>
                    </Grid>
                ))}

                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'rgba(197, 160, 89, 0.02)' }}>
                        <TrendingUpIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2, opacity: 0.2 }} />
                        <Typography variant="h6" color="text.secondary">Revenue Analytics Placeholder</Typography>
                        <Typography variant="caption" color="text.secondary">Interactive charts will be loaded here</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, height: 400 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Room Distribution</Typography>
                        <Stack spacing={3}>
                            {[
                                { label: 'Suites', value: 45, color: '#c5a059' },
                                { label: 'Deluxe', value: 30, color: '#1a1c1e' },
                                { label: 'Standard', value: 25, color: '#64748b' }
                            ].map((item, i) => (
                                <Box key={i}>
                                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.value}%</Typography>
                                    </Stack>
                                    <Box sx={{ width: '100%', height: 8, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                                        <Box sx={{ width: `${item.value}%`, height: '100%', bgcolor: item.color }} />
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                        <Divider sx={{ my: 4 }} />
                        <Typography variant="caption" color="text.secondary">
                            Live system status: All services operational.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
