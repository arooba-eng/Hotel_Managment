import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#344e41', // Dark Jungle Green
            light: '#3a5a40',
            dark: '#2c3e34',
            contrastText: '#dad7cd',
        },
        secondary: {
            main: '#588157', // Fern Green
            light: '#a3b18a', // Sage
            dark: '#344e41',
        },
        background: {
            default: '#dad7cd', // Timberwolf (Light contrast)
            paper: '#ffffff',
        },
        custom: {
            sage: '#a3b18a',
            timberwolf: '#dad7cd',
            hunter: '#3a5a40',
        },
        text: {
            primary: '#344e41',
            secondary: '#588157',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "system-ui", sans-serif',
        h1: { fontSize: '3rem', fontWeight: 700, color: '#344e41' },
        h2: { fontSize: '2.25rem', fontWeight: 600, color: '#344e41' },
        h3: { fontSize: '1.75rem', fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(52, 78, 65, 0.15)',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#344e41',
                    '&:hover': {
                        backgroundColor: '#3a5a40',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#344e41',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(163, 177, 138, 0.2)',
                },
            },
        },
    },
});

export default theme;
