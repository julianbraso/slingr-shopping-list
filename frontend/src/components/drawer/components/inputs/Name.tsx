import { TextField } from "@mui/material"
import { InputProps } from "../../../../types/types"

export const NameComponent = ({ item, isLoading, onChangeCallback }: InputProps) => {
    return <TextField
        disabled={isLoading}
        fullWidth
        placeholder="Item Name"
        variant="outlined"
        value={item?.name}
        sx={{
            mb: '2px',
            '& .MuiInputBase-root': {
                height: 52,
            }, '& fieldset': {
                borderColor: '#D5DFE9',
            },
        }}
        onChange={(e) => onChangeCallback(e.target.value)}
    // onChange={(e) => setItem({ ...item, name: e.target.value })}
    />
}