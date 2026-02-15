import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240; // Smaller sidebar

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const menuItems = [
        { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard', roles: ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'] },
        { label: 'System Users', icon: <PeopleIcon sx={{ fontSize: 20 }} />, path: '/admin/system-users', roles: ['admin'] },
        { label: 'Room Management', icon: <MeetingRoomIcon sx={{ fontSize: 20 }} />, path: '/admin/rooms', roles: ['admin', 'manager'] },
        { label: 'Reservations', icon: <BookOnlineIcon sx={{ fontSize: 20 }} />, path: '/admin/reservations', roles: ['admin', 'manager', 'receptionist'] },
        { label: 'Housekeeping', icon: <CleaningServicesIcon sx={{ fontSize: 20 }} />, path: '/admin/housekeeping', roles: ['admin', 'manager', 'housekeeping'] },
        { label: 'Maintenance', icon: <EngineeringIcon sx={{ fontSize: 20 }} />, path: '/admin/maintenance', roles: ['admin', 'manager', 'maintenance'] },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'primary.main',
                    color: '#dad7cd',
                    borderRight: 'none',
                },
            }}
        >
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'secondary.light', mb: 0 }}>
                    LUXURY<span style={{ color: '#dad7cd' }}>STAY</span>
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 1, fontSize: '0.65rem' }}>ADMIN PANEL</Typography>
            </Box>

            <Box sx={{ px: 2, py: 2, textAlign: 'center' }}>
                <Avatar
                    sx={{ width: 48, height: 48, mx: 'auto', mb: 1, bgcolor: 'secondary.main', fontSize: '1rem' }}
                >
                    {userInfo?.name[0]}
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>{userInfo?.name}</Typography>
                <Chip
                    label={userInfo?.role.toUpperCase()}
                    size="small"
                    sx={{ mt: 0.5, height: 20, fontSize: '0.625rem', bgcolor: 'rgba(163, 177, 138, 0.2)', color: 'secondary.light' }}
                />
            </Box>

            <Divider sx={{ borderColor: 'rgba(218, 215, 205, 0.1)', mx: 2 }} />

            <List sx={{ px: 1, py: 2 }}>
                {menuItems.filter(item => item.roles.includes(userInfo?.role)).map((item) => (
                    <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                                borderRadius: 1.5,
                                py: 1,
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(163, 177, 138, 0.15)',
                                    color: '#fff',
                                    '& .MuiListItemIcon-root': { color: '#fff' },
                                    '&:hover': { bgcolor: 'rgba(163, 177, 138, 0.25)' }
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.path ? '#fff' : 'rgba(218, 215, 205, 0.5)', minWidth: 36 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 600 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 'auto', pb: 2, px: 1 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 1.5,
                        color: '#ef4444',
                        py: 0.8,
                        '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}><LogoutIcon sx={{ fontSize: 18 }} /></ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 600 }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default AdminSidebar;
