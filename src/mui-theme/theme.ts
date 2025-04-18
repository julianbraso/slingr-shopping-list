import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#4d81b7',
        },
        secondary: {
            main: '#1871e8',
        },
        background: {
            default: '#f4f4f4',
        },
        divider: '#c6c6c6',
    },
    typography: {
        fontFamily: `'Nunito', 'Arial', sans-serif`,
        h6: {
            fontFamily: `'Dosis', sans-serif`,
        },
    },
});

export default theme;