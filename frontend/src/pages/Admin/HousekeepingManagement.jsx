import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, Select, MenuItem,
    FormControl, InputLabel, Stack, CircularProgress, Alert, TextField, Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { getHousekeepingTasks, createHousekeepingTask, updateHousekeepingStatus, getRooms, getAllUsers } from '../../api';

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

const HousekeepingManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        room: '',
        staff: '',
        taskType: 'regular',
        priority: 'medium',
        notes: ''
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = ['admin', 'manager'].includes(userInfo?.role);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [tasksRes, roomsRes, usersRes] = await Promise.all([
                getHousekeepingTasks(),
                getRooms(),
                getAllUsers()
            ]);
            setTasks(tasksRes.data);
            setRooms(roomsRes.data.filter(r => r.status === 'cleaning' || r.status === 'available'));
            setStaff(usersRes.data.filter(u => u.role === 'housekeeping'));
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
            await updateHousekeepingStatus(id, { status });
            fetchData();
        } catch (err) {
            setError('Status update failed');
        }
    };

    const handleCreateTask = async () => {
        try {
            await createHousekeepingTask(formData);
            setOpen(false);
            fetchData();
        } catch (err) {
            setError('Task creation failed');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Housekeeping Service</Typography>
                    <Typography variant="body2" color="text.secondary">Room cleaning schedules and task tracking.</Typography>
                </Box>
                {isAdmin && (
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddTaskIcon sx={{ fontSize: 18 }} />}
                        onClick={() => setOpen(true)}
                        sx={{ px: 2, py: 1, borderRadius: 1.5 }}
                    >
                        Assign Task
                    </Button>
                )}
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5, py: 0 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.03)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Room</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Staff</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task._id} hover>
                                <TableCell sx={{ fontWeight: 700 }}>{task.room?.roomNumber}</TableCell>
                                <TableCell>{task.taskType.replace('-', ' ')}</TableCell>
                                <TableCell>{task.staff?.name || 'Unassigned'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.priority}
                                        size="small"
                                        sx={{ height: 18, fontSize: '0.6rem', bgcolor: task.priority === 'high' ? 'error.light' : 'success.light', color: task.priority === 'high' ? 'error.dark' : 'success.dark' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.status.replace('-', ' ').toUpperCase()}
                                        size="small"
                                        color={task.status === 'completed' ? 'success' : 'warning'}
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {task.status !== 'completed' && (
                                        <Button
                                            size="small"
                                            startIcon={<CheckCircleIcon />}
                                            onClick={() => handleStatusUpdate(task._id, 'completed')}
                                            sx={{ fontSize: '0.65rem', py: 0 }}
                                        >
                                            Done
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {tasks.length === 0 && (
                            <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>No pending tasks</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>New Cleaning Task</Typography>
                    <Stack spacing={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Select Room</InputLabel>
                            <Select label="Select Room" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })}>
                                {rooms.map(r => <MenuItem key={r._id} value={r._id}>{r.roomNumber} - {r.roomType}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel>Assign Staff</InputLabel>
                            <Select label="Assign Staff" value={formData.staff} onChange={(e) => setFormData({ ...formData, staff: e.target.value })}>
                                {staff.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel>Priority</InputLabel>
                            <Select label="Priority" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth multiline rows={2} size="small" label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                        <Button fullWidth variant="contained" sx={{ mt: 2, borderRadius: 1.5 }} onClick={handleCreateTask}>Create Task</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default HousekeepingManagement;
