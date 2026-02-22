import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Stack,
    CircularProgress, Alert, Avatar
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { getServiceRequests, updateServiceStatus } from '../../api';

const ServiceRequests = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await getServiceRequests();
            setServices(data);
        } catch (err) {
            setError('Failed to load service requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateServiceStatus(id, { status });
            fetchData();
        } catch (err) {
            setError('Status update failed');
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'room-service': return <RoomServiceIcon />;
            case 'laundry': return <DryCleaningIcon />;
            case 'transportation': return <LocalTaxiIcon />;
            default: return <RoomServiceIcon />;
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Guest Services</Typography>
                <Typography variant="body2" color="text.secondary">Real-time room service, laundry, and transport requests.</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.04)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Service</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Guest & Room</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service._id} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                            {getIcon(service.serviceType)}
                                        </Avatar>
                                        <Typography sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                                            {service.serviceType.replace('-', ' ')}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{service.guest?.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800 }}>Room {service.room?.roomNumber}</Typography>
                                </TableCell>
                                <TableCell sx={{ maxWidth: 250 }}>
                                    <Typography variant="body2" color="text.secondary" noWrap>{service.details}</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>${service.cost}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={service.status.toUpperCase()}
                                        size="small"
                                        color={service.status === 'completed' || service.status === 'delivered' ? 'success' : 'warning'}
                                        sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {service.status === 'pending' && (
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => handleUpdateStatus(service._id, 'completed')}
                                            startIcon={<DoneAllIcon />}
                                            sx={{ borderRadius: 1.5, fontSize: '0.75rem' }}
                                        >
                                            Complete
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ServiceRequests;
