import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, Select, MenuItem,
    FormControl, InputLabel, Stack, CircularProgress, Alert, TextField, Grid
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getMaintenanceRequests, createMaintenanceRequest, updateMaintenanceStatus, getRooms, getAllUsers } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

const MaintenanceManagement = () => {
    const [requests, setRequests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        room: '',
        issueDescription: '',
        priority: 'medium',
        category: 'Plumbing'
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = ['admin', 'manager'].includes(userInfo?.role);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [reqRes, roomsRes, usersRes] = await Promise.all([
                getMaintenanceRequests(),
                getRooms(),
                getAllUsers()
            ]);
            setRequests(reqRes.data);
            setRooms(roomsRes.data);
            setStaff(usersRes.data.filter(u => u.role === 'maintenance'));
        } catch (err) {
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateMaintenanceStatus(id, { status });
            fetchData();
        } catch (err) {
            setError('Status update failed');
        }
    };

    const handleCreateRequest = async () => {
        try {
            await createMaintenanceRequest(formData);
            setOpen(false);
            fetchData();
        } catch (err) {
            setError('Request creation failed');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Maintenance Requests</Typography>
                    <Typography variant="body2" color="text.secondary">Report and track room repairs and facility issues.</Typography>
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleIcon sx={{ fontSize: 18 }} />}
                    onClick={() => setOpen(true)}
                    sx={{ px: 2, py: 1, borderRadius: 1.5 }}
                >
                    New Request
                </Button>
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5, py: 0 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.03)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Room</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Staff</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((req) => (
                            <TableRow key={req._id} hover>
                                <TableCell sx={{ fontWeight: 700 }}>{req.room?.roomNumber}</TableCell>
                                <TableCell>{req.category}</TableCell>
                                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.issueDescription}</TableCell>
                                <TableCell>{req.assignedStaff?.name || 'Pending assignment'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={req.status.toUpperCase()}
                                        size="small"
                                        color={req.status === 'completed' ? 'success' : req.status === 'pending' ? 'error' : 'warning'}
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {req.status !== 'completed' && (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<BuildIcon />}
                                            onClick={() => handleStatusUpdate(req._id, 'completed')}
                                            sx={{ fontSize: '0.65rem', py: 0 }}
                                        >
                                            Resolve
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Log Maintenance Issue</Typography>
                    <Stack spacing={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Select Room</InputLabel>
                            <Select label="Select Room" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })}>
                                {rooms.map(r => <MenuItem key={r._id} value={r._id}>{r.roomNumber} - {r.roomType}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                <MenuItem value="Plumbing">Plumbing</MenuItem>
                                <MenuItem value="Electrical">Electrical</MenuItem>
                                <MenuItem value="HVAC">HVAC</MenuItem>
                                <MenuItem value="Furniture">Furniture</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth multiline rows={3} size="small" label="Issue Description" value={formData.issueDescription} onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })} />
                        <Button fullWidth variant="contained" sx={{ mt: 2, borderRadius: 1.5 }} onClick={handleCreateRequest}>Submit Report</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default MaintenanceManagement;
