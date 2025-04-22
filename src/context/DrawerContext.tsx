import { createContext, ReactNode, useState } from "react";
import { Item } from "../types/types";
import SideDrawer from "../components/drawer/SideDrawer";
import { EditItem } from "../components/drawer/EditItem";
import { AddItem } from "../components/drawer/AddItem";
import { DeleteItemModal } from "../components/modals/DeleteItem";

interface DrawerContextType {
    openDrawer: (mode: 'add' | 'edit', item?: Item) => void;
    closeDrawer: () => void;
    openDelete: (item: Item) => void;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [mode, setMode] = useState<'add'|'edit'>();
    const [selectedItem, setSelectedItem] = useState<Item>();

    const openDrawer = (mode: 'add' | 'edit', item?: Item) => {
        setMode(mode);
        setDrawerOpen(true);
        setSelectedItem(item ?? undefined);
    }

    const closeDrawer = () => {
        setDrawerOpen(false);
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
        <DrawerContext.Provider value={{
            openDrawer,
            closeDrawer,
            openDelete
        }} >
            {children}
            <SideDrawer isOpen={drawerOpen} onClose={() => closeDrawer()}>
                {mode === 'edit' ? <EditItem cancelCallback={() => closeDrawer()} /> : <AddItem cancelCallback={() => closeDrawer()} />}
            </SideDrawer>
            {selectedItem && <DeleteItemModal item={selectedItem} open={deleteOpen} cancelCallback={() => closeDeleteModal()}/>}
        </DrawerContext.Provider>
    )
}