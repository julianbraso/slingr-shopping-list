import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

interface Props {
  cancelCallback: () => void;
}

export const AddItem: React.FC<Props> = ({cancelCallback}) => {
    return <Box sx={{ px: '20px', pt: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Typography variant='h2' color='#2A323C' fontSize='18px' fontWeight='400' lineHeight={'24px'}>Add an Item</Typography>
    <Typography paddingY={0.5} color='#5C6269' fontSize='16px' fontWeight='400' lineHeight='22px'>Add your new item below</Typography>
    <Box paddingY={1} sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <TextField fullWidth placeholder="Item Name" variant="outlined" sx={{
        mb: '2px',
        '& .MuiInputBase-root': {
          height: 52,
        }, '& fieldset': {
          borderColor: '#D5DFE9',
        },
      }} />
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="Description"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingBottom: '24px',
            }
          }}
          multiline
          rows={5}
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
      <FormControl fullWidth>
        <InputLabel sx={{ opacity: '60%' }}>How many?</InputLabel>
        <Select
          labelId="quantity-select-label"
          id="quantity-select"
          value={''}
          onChange={() => { }}
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
    <Box className='center' sx={{ mt: 'auto', ml: 'auto', pb:'20px', gap:'10px'}}>
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
        onClick={() => { }}
        variant="contained"
        disableElevation={true}
        color='secondary'
        sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
      >
        Add Item
      </Button>
    </Box>
  </Box>
}