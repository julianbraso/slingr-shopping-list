import { Box, TextField, Typography } from "@mui/material"
import { InputProps } from "../../../../types/types"

export const DescriptionComponent = ({item,isLoading,onChangeCallback}:InputProps) => {
    return <Box sx={{ position: 'relative' }}>
    <TextField
      fullWidth
      placeholder="Description"
      disabled={isLoading}
      value={item?.description}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          paddingBottom: '24px',
        }
      }}
      multiline
      rows={5}
      onChange={(e) => onChangeCallback(e.target.value)}
      //onChange={(e) => setItem({ ...item, description: e.target.value })} 
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
      {item?.description.length}/100
    </Typography>
  </Box>
}