import { Box, Card, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import theme from "../../mui-theme/theme";
import { Item } from "../../types/types";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateItem } from "../../utils/api";

interface ItemProps {
    item: Item;
    n?: number;
}

const removeMarginPadding = {
    m: 0,
    p: 0
}

export const ItemComponent: React.FC<ItemProps> = ({ item, n }) => {
    const [loading, setLoading] = useState(false);
    const appContext = useContext(AppContext);
    return <Card
        elevation={0}
        key={n}
        sx={{
            paddingY: 1.5,
            border: !item.purchased ? '1px solid #D5DFE9' : 'transparent',
            backgroundColor: item.purchased ? 'rgba(213, 223, 233, 0.17)' : 'transparent',
            pointerEvents: loading ? 'none' : 'auto',
            opacity: loading ? '30%' : '100%'
        }}
    >
        <ListItem
            key={n}
            secondaryAction={
                <Box display={'flex'} sx={{ width: '4rem', justifyContent: 'space-between' }}>
                    <IconButton aria-label="edit"
                        sx={removeMarginPadding}
                        onClick={() => appContext?.openDrawer('edit', item)}
                    >
                        <div className="material-icons-outlined" style={{ color: '#555F7C', fontSize: '23px' }}>edit</div>
                    </IconButton>
                    <IconButton aria-label="delete"
                        sx={removeMarginPadding}
                        onClick={() => appContext?.openDelete(item)}
                    >
                        <div className="material-icons-outlined" style={{ color: '#555F7C', fontSize: '23px' }}>delete</div>
                    </IconButton>
                </Box>
            }
            disablePadding
            sx={{
                height: '100%',
                width: '100%',
                '& .MuiListItemSecondaryAction-root': {
                    right: 30,
                }
            }}
        >
            <ListItemIcon >
                <Checkbox
                    edge="start"
                    checked={item.purchased}
                    onClick={() => {
                        setLoading(true)
                        updateItem(item, {purchased: !item.purchased})
                            .finally(() => appContext?.getItems(true).finally(()=>setLoading(false)));
                    }}
                    tabIndex={-1}
                    disableRipple
                    size="medium"
                    sx={{ width: '100%', margin: '0' }}
                />
            </ListItemIcon>
            <ListItemText
                id={item.name}
                primary={item.name}
                secondary={item.description}
                sx={{ mt: 1.5 }}
                slotProps={{
                    primary: {
                        sx: {
                            fontSize: '16px',
                            fontWeight: 600,
                            lineHeight: '20px',
                            pb: '4px',
                            textDecoration: item.purchased ? 'line-through' : 'none',
                            textDecorationThickness: 0.5,
                            color: item.purchased ? theme.palette.primary.main : 'black',
                        },
                    },
                    secondary: {
                        sx: {
                            fontSize: '14px',
                            fontWeight: 600,
                            lineHeight: '20px',
                            textDecoration: item.purchased ? 'line-through' : 'none',
                            textDecorationThickness: 0.5,
                            color: '#7D7A7A'
                        },
                    },
                }}
            />
        </ListItem>
    </Card>
}