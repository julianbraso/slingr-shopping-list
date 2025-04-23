import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { LoadingSpinner } from "../misc/LoadingSpinner";
import { Item } from "../../types/types";
import { createItem } from "../../utils/api";
import { AppContext } from "../../context/AppContext";

interface Props {
  cancelCallback: () => void;
}

const emptyItem = {
  name: '',
  description: '',
  quantity: 1,
  purchased: false,
}

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
      <TextField disabled={isLoading} fullWidth placeholder="Item Name" variant="outlined" sx={{
        mb: '2px',
        '& .MuiInputBase-root': {
          height: 52,
        }, '& fieldset': {
          borderColor: '#D5DFE9',
        },
      }}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="Description"
          variant="outlined"
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingBottom: '24px',
            }
          }}
          multiline
          rows={5}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '14px',
          }}
        >
          {0}/100
        </Typography>
      </Box>
      <FormControl disabled={isLoading} fullWidth>
        <InputLabel sx={{  bgcolor:'white' }}>How many?</InputLabel>
        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: Number(e?.target.value) })}
          sx={{
            '& fieldset': {
              borderColor: '#D5DFE9',
            }
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box className='center' sx={{ mt: 'auto', ml: 'auto', pb: '20px', gap: '10px' }}>
      <Button
        onClick={cancelCallback}
        variant="text"
        disableElevation={true}
        color='inherit'
        disabled={isLoading}
        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => addItem()}
        variant="contained"
        disableElevation={true}
        color='secondary'
        disabled={isLoading || !item.name}
        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
      >
        {isLoading ? <LoadingSpinner size="20px" sx={{ color: 'white' }} /> : 'Add Item'}
      </Button>
    </Box>
  </Box>
}