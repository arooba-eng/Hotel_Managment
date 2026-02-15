import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, TextField,
    Select, MenuItem, FormControl, InputLabel, Stack, CircularProgress, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAllUsers, createStaffUser, updateStaffUser, deleteStaffUser } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
    borderRadius: 6,
};

const SystemUsers = () => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', role: 'receptionist', password: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpen = (user = null) => {
        if (user) {
            setEditingId(user._id);
            setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        } else {
            setEditingId(null);
            setFormData({ name: '', email: '', role: 'receptionist', password: '' });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateStaffUser(editingId, formData);
            } else {
                await createStaffUser(formData);
            }
            handleClose();
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this staff member?')) {
            try {
                await deleteStaffUser(id);
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user');
            }
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
            <CircularProgress color="secondary" />
        </Box>
    );

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>System Users</Typography>
                    <Typography variant="body2" color="text.secondary">Manage staff permissions and access.</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
                    onClick={() => handleOpen()}
                    sx={{ px: 2, py: 1, borderRadius: 1.5 }}
                >
                    Add Staff
                </Button>
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5, py: 0 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.03)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role?.toUpperCase()}
                                        size="small"
                                        variant="outlined"
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700, borderColor: 'primary.light', color: 'primary.main' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.status === 'active' ? 'Active' : 'Inactive'}
                                        color={user.status === 'active' ? 'success' : 'error'}
                                        size="small"
                                        sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                        <IconButton size="small" color="primary" onClick={() => handleOpen(user)} sx={{ p: 0.5 }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(user._id)} sx={{ p: 0.5 }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style, width: 400, p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                        {editingId ? 'Update Staff Member' : 'New Staff Member'}
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <MenuItem value="manager">Manager</MenuItem>
                                <MenuItem value="receptionist">Receptionist</MenuItem>
                                <MenuItem value="housekeeping">Housekeeping</MenuItem>
                                <MenuItem value="maintenance">Maintenance</MenuItem>
                            </Select>
                        </FormControl>
                        {!editingId && (
                            <TextField
                                fullWidth
                                size="small"
                                label="Password"
                                type="password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        )}

                        <Box sx={{ mt: 1, pt: 1 }}>
                            <Button fullWidth variant="contained" color="primary" size="medium" sx={{ py: 1, borderRadius: 1.5 }} onClick={handleSubmit}>
                                {editingId ? 'Update' : 'Create'}
                            </Button>
                            <Button fullWidth variant="text" size="small" sx={{ mt: 0.5 }} onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default SystemUsers;
