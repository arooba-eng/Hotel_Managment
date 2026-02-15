import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#344e41', // Deep Green
            light: '#3a5a40',
            dark: '#2c3e34',
            contrastText: '#dad7cd',
        },
        secondary: {
            main: '#588157', // Fern Green
            light: '#a3b18a', // Sage
            dark: '#344e41',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f4f1ea', // Very light beige / cream
            paper: '#ffffff',
        },
        text: {
            primary: '#344e41',
            secondary: '#588157',
        },
        action: {
            hover: '#dad7cd',
        },
        custom: {
            timberwolf: '#dad7cd',
            sage: '#a3b18a',
        },
        divider: 'rgba(52, 78, 65, 0.1)',
    },
    spacing: 6, // Smaller base spacing for compact UI
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 800 }, // Reduced size
        h2: { fontSize: '1.75rem', fontWeight: 700 }, // Reduced size
        h3: { fontSize: '1.4rem', fontWeight: 700 }, // Reduced size
        h4: { fontSize: '1.2rem', fontWeight: 700 }, // Reduced size
        h5: { fontSize: '1rem', fontWeight: 600 },
        h6: { fontSize: '0.875rem', fontWeight: 600 },
        body1: { fontSize: '0.875rem', lineHeight: 1.5 },
        body2: { fontSize: '0.75rem', lineHeight: 1.5 },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '0.8125rem' },
        caption: { fontSize: '0.7rem' },
        overline: { fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.65rem' },
    },
    shape: {
        borderRadius: 8, // More compact corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    padding: '6px 16px', // Smaller padding
                },
                containedPrimary: {
                    backgroundColor: '#344e41',
                    '&:hover': {
                        backgroundColor: '#3a5a40',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '8px 12px', // Compact tables
                    fontSize: '0.8125rem',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingTop: '6px',
                    paddingBottom: '6px',
                },
            },
        },
    },
});

export default theme;
