import { Box, CssBaseline, AppBar, Toolbar, IconButton, Badge, Typography, Stack, Divider } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminSidebar from '../components/Admin/AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <CssBaseline />

            <AdminSidebar />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        borderBottom: '1px solid #e0e0e0',
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'flex-end', gap: 1.5, py: 0.5, minHeight: 56 }}>
                        <IconButton size="small"><NotificationsNoneIcon sx={{ fontSize: 20 }} /></IconButton>
                        <IconButton size="small"><SettingsIcon sx={{ fontSize: 20 }} /></IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24, alignSelf: 'center' }} />

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, lineHeight: 1 }}>Staff Portal</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Management Active</Typography>
                            </Box>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
