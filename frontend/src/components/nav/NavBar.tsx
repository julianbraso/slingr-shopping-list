import { AppBar, Toolbar, Typography } from "@mui/material"

const NavBar = () => {
    return <AppBar
        elevation={0}
        position="static" >
        <Toolbar sx={{height:'64px'}}>
            <Typography sx={{fontFamily: `'Dosis', sans-serif`, fontSize:'18px', fontWeight:'600', letterSpacing: '0.25px', lineHeight: '100%', textTransform: 'uppercase'}}>
                Shopping List
            </Typography>
        </Toolbar>
    </AppBar>
}

export default NavBar;