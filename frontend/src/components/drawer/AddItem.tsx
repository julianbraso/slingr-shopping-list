import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { LoadingSpinner } from "../misc/LoadingSpinner";
import { Item } from "../../types/types";
import { createItem } from "../../utils/api";
import { AppContext } from "../../context/AppContext";
import { DescriptionComponent } from "./components/inputs/Description";
import { DropdownComponent } from "./components/inputs/Dropdown";
import { NameComponent } from "./components/inputs/Name";

interface Props {
  cancelCallback: () => void;
}

const emptyItem = {
  name: '',
  description: '',
  quantity: 1,
  purchased: false,
}

const btnStyling = { padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }

export const AddItem: React.FC<Props> = ({ cancelCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<Item>(emptyItem);
  const appContext = useContext(AppContext);

  const addItem = () => {
    setIsLoading(true);
    createItem(item)
      .then(() => {
        setItem(emptyItem);
        cancelCallback();
      })
      .catch((er) => console.log(er))
      .finally(() => {
        setIsLoading(false);
        appContext?.getItems();
      });
  }

  return <Box sx={{ px: '20px', pt: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Typography variant='h2' color='#2A323C' fontSize='18px' fontWeight='400' lineHeight={'24px'}>Add an Item</Typography>
    <Typography paddingY={0.5} color='#5C6269' fontSize='16px' fontWeight='400' lineHeight='22px'>Add your new item below</Typography>
    <Box paddingY={1} sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <NameComponent item={item} onChangeCallback={(v) => setItem({ ...item, name: v })} />
      <DescriptionComponent item={item} isLoading={isLoading} onChangeCallback={(v) => setItem({ ...item, description: v })} />
      <DropdownComponent item={item} isLoading={isLoading} onChangeCallback={(v) => setItem({ ...item, quantity: Number(v) })} />
    </Box>
    <Box className='center' sx={{ mt: 'auto', ml: 'auto', pb: '20px', gap: '10px' }}>
      <Button
        onClick={cancelCallback}
        variant="text"
        disableElevation={true}
        color='inherit'
        disabled={isLoading}
        sx={btnStyling}
      >
        Cancel
      </Button>
      <Button
        onClick={() => addItem()}
        variant="contained"
        disableElevation={true}
        color='secondary'
        disabled={isLoading || !item.name}
        sx={btnStyling}
      >
        {isLoading ? <LoadingSpinner size="20px" sx={{ color: 'white' }} /> : 'Add Item'}
      </Button>
    </Box>
  </Box>
}