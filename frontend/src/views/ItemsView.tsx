import { Box } from "@mui/material";
import { LoadingSpinner } from "../components/misc/LoadingSpinner";
import EmptyListMsg from "../components/list/EmptyListMsg";
import { ItemList } from "../components/list/ItemList";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export const ItemsView = () => {
    const appContext = useContext(AppContext);

    useEffect(() => {
        appContext?.getItems()
    }, [])

    return (
        <Box className="center bodyContainer">
            {appContext?.loadingItems ? <LoadingSpinner /> : !appContext?.items || appContext?.items.length < 1 ? <EmptyListMsg clickCallback={() => appContext?.openDrawer('add')} /> : appContext && <ItemList items={appContext.items} />}
        </Box>
    );
}