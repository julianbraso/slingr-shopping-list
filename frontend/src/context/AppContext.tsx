import { createContext, ReactNode, useState } from "react";
import { Item } from "../types/types";
import SideDrawer from "../components/drawer/SideDrawer";
import { EditItem } from "../components/drawer/EditItem";
import { AddItem } from "../components/drawer/AddItem";
import { DeleteItemModal } from "../components/modals/DeleteItem";
import { getAllItems } from "../utils/api";

interface AppContextType {
    openDrawer: (mode: 'add' | 'edit', item?: Item) => void;
    closeDrawer: () => void;
    openDelete: (item: Item) => void;
    getItems: (noSpinner?: boolean) => Promise<any>;
    items: Item[];
    loadingItems: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    //const [drawerOpen, setDrawerOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit' | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [items, setItems] = useState<Item[]>([]);
    const [loadingItems, setLoadingItems] = useState(false);

    const getItems = (noSpinner?: boolean) => {
        !noSpinner && setLoadingItems(true);
        return getAllItems()
            .then((v) => {
                setItems(v);
                return v;
            })
            .finally(()=>setLoadingItems(false));
    }

    const openDrawer = (mode: 'add' | 'edit' , item?: Item) => {
        setMode(mode);
        setSelectedItem(item ?? undefined);
    }

    const drawerOpen = mode != null;

    const closeDrawer = () => {
        //setDrawerOpen(false);
        setMode(null);
    }

    const openDelete = (item?: Item) => {
        setDeleteOpen(true);
        setSelectedItem(item ?? undefined);
    }

    const closeDeleteModal = () => {
        setDeleteOpen(false);
        setSelectedItem(undefined);
    }

    return (
        <AppContext.Provider value={{
            openDrawer,
            closeDrawer,
            openDelete,
            items,
            getItems,
            loadingItems
        }} >
            {children}
            <SideDrawer isOpen={drawerOpen} onClose={closeDrawer}>
                {mode === 'edit' && selectedItem ? <EditItem cancelCallback={closeDrawer} itemToEdit={selectedItem} /> : <AddItem cancelCallback={closeDrawer} />}
            </SideDrawer>
            {deleteOpen && selectedItem && <DeleteItemModal item={selectedItem} open={deleteOpen} cancelCallback={closeDeleteModal} />}
        </AppContext.Provider>
    )
}