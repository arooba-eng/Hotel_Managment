import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Stack, Avatar, Menu, MenuItem, Tooltip, Grid, TextField } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Rooms', path: '/rooms' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        handleClose();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ py: 0.5, minHeight: { xs: 56, md: 64 } }}>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 800,
                                color: 'primary.main',
                                textDecoration: 'none',
                                letterSpacing: -0.5,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            LUXURY<span style={{ color: '#588157' }}>STAY</span>
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    size="small"
                                    sx={{
                                        color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                                        fontWeight: location.pathname === item.path ? 700 : 500,
                                        '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            {userInfo ? (
                                <>
                                    <Tooltip title="Account settings">
                                        <Button
                                            onClick={handleMenu}
                                            size="small"
                                            startIcon={<AccountCircleIcon sx={{ fontSize: 20 }} />}
                                            sx={{ color: 'primary.main', fontWeight: 600, textTransform: 'none' }}
                                        >
                                            {userInfo.name.split(' ')[0]}
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                borderRadius: 2,
                                                mt: 1,
                                                border: '1px solid #e0e0e0',
                                                '& .MuiMenuItem-root': { py: 0.5, px: 2, fontSize: '0.875rem' }
                                            }
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem
                                            component={RouterLink}
                                            to={['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance'].includes(userInfo.role) ? '/admin/dashboard' : '/dashboard'}
                                            onClick={handleClose}
                                        >
                                            Dashboard
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        component={RouterLink}
                                        to="/login"
                                        sx={{ borderRadius: 1.5 }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        component={RouterLink}
                                        to="/register"
                                        sx={{ borderRadius: 1.5, display: { xs: 'none', sm: 'flex' } }}
                                    >
                                        Join Now
                                    </Button>
                                </>
                            )}
                            <IconButton size="small" sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
                                <MenuIcon />
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                {children}
            </Box>

            <Box component="footer" sx={{ py: 4, bgcolor: 'primary.main', color: '#dad7cd', mt: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>LUXURYSTAY</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7, maxWidth: 250, display: 'block' }}>
                                Redefining the standard of luxury hospitality with sustainable elegance.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>DISCOVER</Typography>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Our Rooms</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Dining</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>SUPPORT</Typography>
                            <Stack spacing={0.5}>
                                <Typography variant="caption" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Contact Us</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>FAQ</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>NEWSLETTER</Typography>
                            <Stack direction="row" spacing={1}>
                                <TextField placeholder="Email" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1.5, '& .MuiOutlinedInput-input': { color: 'white', py: 0.8, fontSize: '0.75rem' } }} />
                                <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 1.5, px: 2 }}>Join</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 3, pt: 2, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ opacity: 0.5 }}>
                            © {new Date().getFullYear()} LuxuryStay Group. Minimalist Excellence.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
