import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import theme from "../../mui-theme/theme";
import { Item } from "../../types/types";
import { useContext, useState } from "react";
import { LoadingSpinner } from "../misc/LoadingSpinner";
import { updateItem } from "../../utils/api";
import { AppContext } from "../../context/AppContext";

interface Props {
  cancelCallback: () => void;
  itemToEdit: Item;
}

export const EditItem: React.FC<Props> = ({ cancelCallback, itemToEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<Item>(itemToEdit);
  const appContext = useContext(AppContext);


  const editItem = () => {
    setIsLoading(true);
    updateItem(item)
      .then(() => {
        cancelCallback();
      })
      .catch((er) => console.log(er))
      .finally(() => {
        setIsLoading(false);
        appContext?.getItems();
      });
  }

  // TODO: pulir un poco mas esto, acomodar mejor, separar
  return <Box sx={{ px: '20px', pt: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Typography variant='h2' color='#2A323C' fontSize='18px' fontWeight='400' lineHeight={'24px'}>Edit an Item</Typography>
    <Typography paddingY={0.5} color='#5C6269' fontSize='16px' fontWeight='400' lineHeight='22px'>Edit your item below</Typography>
    <Box paddingY={1} sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <TextField fullWidth placeholder="Item Name" variant="outlined" sx={{
        mb: '2px',
        '& .MuiInputBase-root': {
          height: 52,
        }, '& fieldset': {
          borderColor: '#D5DFE9',
        },
      }}
        value={item.name}
        disabled={isLoading}
        onChange={(e) => setItem({ ...item, name: e.target.value })} />
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="Description"
          disabled={isLoading}
          value={item.description}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingBottom: '24px',
            }
          }}
          multiline
          rows={5}
          onChange={(e) => setItem({ ...item, description: e.target.value })} />
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
        <InputLabel sx={{ bgcolor: 'white' }}>How many?</InputLabel>
        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
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
      <FormControlLabel control={
        <Checkbox disabled={isLoading} checked={item.purchased}
          onChange={(e) => setItem({ ...item, purchased: e.target.checked })}
          sx={{ color: theme.palette.divider }} />}
        label={<Typography sx={{ color: '#9CA8B4' }}>Purchased</Typography>}
      />
    </Box>
    <Box className='center' sx={{ mt: 'auto', ml: 'auto', pb: '20px', gap: '10px' }}>
      <Button
        onClick={cancelCallback}
        variant="text"
        disableElevation={true}
        color='inherit'
        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => editItem()}
        variant="contained"
        disableElevation={true}
        color='secondary'
        disabled={isLoading}
        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
      >
        {isLoading ? <LoadingSpinner size="20px" sx={{ color: 'white' }} /> : 'Save Item'}
      </Button>
    </Box>
  </Box>
}