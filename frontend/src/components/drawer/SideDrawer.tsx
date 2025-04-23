import { Box, Button, Drawer, Typography } from "@mui/material"
import theme from "../../mui-theme/theme";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, children }) => {
    return <Drawer anchor="right" open={isOpen} sx={{ width: '560px' }}>
        <Box
            className="center"
            sx={{ width: '560px', height: '64px', backgroundColor: '#FAFAFA', justifyContent: 'space-between', px: '20px' }}>
            <Typography color='#5C6269' sx={{ fontFamily: `'Dosis', sans-serif`, fontSize: '18px', fontWeight: '600', letterSpacing: '0.25px', lineHeight: '100%', textTransform: 'uppercase' }}>
                Shopping List
            </Typography>
            <Button variant='text' onClick={onClose} sx={{ minWidth: '24px' }}>
                <div className="material-icons" style={{ color: '#555F7C', fontSize: '24px' }}>last_page</div>
            </Button>
        </Box>
        <Box
            sx={{
                height: '0.5px',
                width: '100%',
                backgroundColor: '#D5DFE9',
                opacity: '90%'
            }}
        />
        {children}
        <Box
            sx={{
                width: '100%',
                height: '5px',
                bgcolor: theme.palette.primary.main,
                mt: 'auto',
            }}
        />
    </Drawer>
}

export default SideDrawer;