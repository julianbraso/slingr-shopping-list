import { Box } from "@mui/material";
import { LoadingSpinner } from "../components/misc/LoadingSpinner";
import EmptyListMsg from "../components/list/EmptyListMsg";
import { ItemList } from "../components/list/ItemList";
import { useContext, useState } from "react";
import { DrawerContext } from "../context/DrawerContext";

const mockItems = [
    {
        "name": "Tomatoes",
        "description": "Green cherry tomatoes",
        "quantity": 1,
        "purchased": true
    },
    {
        "name": "test2",
        "description": "shortDes",
        "quantity": 2,
        "purchased": false
    },
    {
        "name": "test3",
        "description": "shortDes",
        "quantity": 3,
        "purchased": true
    },
]

export const ItemsView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const drawerContext = useContext(DrawerContext);
    ///wip
    const [items, setItems] = useState(mockItems)
    
    return (
        <Box className="center bodyContainer">
            {isLoading ? <LoadingSpinner /> : items.length < 1 ? <EmptyListMsg clickCallback={() => drawerContext?.openDrawer('add')} /> : <ItemList items={items} />}
        </Box>
    );
}