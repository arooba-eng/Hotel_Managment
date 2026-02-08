import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Stack } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const MainLayout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Rooms', path: '/rooms' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ py: 1 }}>
                        <Typography
                            variant="h5"
                            component={RouterLink}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 800,
                                color: 'primary.main',
                                textDecoration: 'none',
                                letterSpacing: -1,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            LUXURY<span style={{ color: '#588157' }}>STAY</span>
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
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

                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={RouterLink}
                                to="/login"
                                sx={{ borderRadius: 2 }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to="/register"
                                sx={{ borderRadius: 2 }}
                            >
                                Join Now
                            </Button>
                        </Stack>

                        <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>

            <Box component="footer" sx={{ py: 6, bgcolor: 'primary.main', color: 'background.default', mt: 10 }}>
                <Container maxWidth="lg">
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={4}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>LUXURYSTAY</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 300, mt: 1 }}>
                                Redefining the standard of luxury hospitality with sustainable elegance and world-class service.
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={4}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>DISCOVER</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', mb: 1 }}>Our Rooms</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', mb: 1 }}>Dining</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer' }}>Spa & Wellness</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>SUPPORT</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', mb: 1 }}>Contact Us</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', mb: 1 }}>Privacy Policy</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer' }}>FAQ</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 6, pt: 4, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ opacity: 0.5 }}>
                            © {new Date().getFullYear()} LuxuryStay Hospitality Group. Crafted for Excellence.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
