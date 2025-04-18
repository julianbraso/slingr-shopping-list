import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface Item {
    name: string;
    description: string;
    quantity: number;
    purchased: boolean;
}

interface ListProps {
    items: Item[]
}

export const ItemList: React.FC<ListProps> = ({ items }) => {
    return (
        // this is the body container
        <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper', mb:'auto' }}>
            {items.map((i, n) => {
                return (
                    <ListItem
                        key={n}
                        secondaryAction={<>
                            <IconButton edge="end" aria-label="edit">
                                <div className="material-icons-outlined" style={{ color: '#555F7C', fontSize: '18px' }}>edit</div>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <div className="material-icons-outlined" style={{ color: '#555F7C', fontSize: '18px' }}>delete</div>
                            </IconButton>
                        </>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={() => { }} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={false}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText id={i.name} primary={i.name} />
                        </ListItemButton>
                    </ListItem>);
            }
            )
            }
        </List>
    )
}