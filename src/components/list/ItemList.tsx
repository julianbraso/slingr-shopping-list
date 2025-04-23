import { Box, Button, Stack, Typography } from "@mui/material";
import { Item } from "../../types/types";
import { ItemComponent } from "./Item";
import { useContext } from "react";
import { DrawerContext } from "../../context/DrawerContext";

interface ListProps {
    items: Item[]
}

const Header = () => {
    const drawerContext = useContext(DrawerContext);

    return <Box alignItems={'end'} display={'flex'} justifyContent={'space-between'} mb={1.5}>
        <Typography
            variant='h2'
            fontSize='18px'
            fontWeight='600'
            lineHeight={'24px'}>
            Your Items
        </Typography>
        <Button
            onClick={() => drawerContext?.openDrawer('add')}
            variant="contained"
            disableElevation={true}
            color='secondary'
            sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
        >
            Add Item
        </Button>
    </Box>
}

export const ItemList: React.FC<ListProps> = ({ items }) => {
    return (
        // stack comp has spacing prop, list doesnt
        <Box sx={{ width: '100%', maxWidth: 1025, paddingX: 6, paddingY:4, mb: 'auto' }}>
            <Header />
            <Stack spacing={1.5} >
                {items.map((i, n) => <ItemComponent key={n} item={i} n={n} />)}
            </Stack>
        </Box>
    )
}