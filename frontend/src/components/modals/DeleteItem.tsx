import { Box, Button, Dialog, Typography } from "@mui/material"
import { Item } from "../../types/types";
import { useContext, useState } from "react";
import { deleteItem } from "../../utils/api";
import { LoadingSpinner } from "../misc/LoadingSpinner";
import { AppContext } from "../../context/AppContext";

interface Props {
    open: boolean;
    item: Item;
    cancelCallback?: () => void;
}

export const DeleteItemModal = ({ open, item, cancelCallback }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const appContext = useContext(AppContext);

    const removeItem = () => {
        setIsLoading(true);
        deleteItem(item)
            .then(() => {
                cancelCallback && cancelCallback();
            })
            .catch((er) => console.log(er))
            .finally(() => {
                setIsLoading(false);
                appContext?.getItems();
            });
    }

    return (
        <Dialog
            open={open}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }
                }
            }}
        >
            <Box display='flex' flexDirection='column' justifyContent='center' sx={{ px: '20px', pt: 3, height: '180px', width: '350px', padding: '30px' }}>
                <Typography
                    variant='h2'
                    color='#2A323C'
                    fontSize='18px'
                    fontWeight='600'
                    lineHeight='24px'
                >
                    Delete Item?
                </Typography>
                <Typography
                    paddingY={0.5}
                    color='#5C6269'
                    fontSize='14px'
                    fontWeight='400'
                    lineHeight='22px'
                >
                    Are you sure you want to delete this item? This can not be undone.
                </Typography>

                <Box className='center' sx={{ mt: 'auto', ml: 'auto', gap: '10px' }}>
                    <Button
                        onClick={cancelCallback}
                        disabled={isLoading}
                        variant="text"
                        disableElevation={true}
                        color='inherit'
                        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={removeItem}
                        disabled={isLoading}
                        variant="contained"
                        disableElevation={true}
                        color='secondary'
                        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
                    >
                        {isLoading ? <LoadingSpinner size="20px" sx={{ color: 'white' }} /> : 'Delete'}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}