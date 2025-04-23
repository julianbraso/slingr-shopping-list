import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { InputProps } from "../../../../types/types"

const menuItems = [1, 2, 3];

export const DropdownComponent: React.FC<InputProps> = ({ item, isLoading, onChangeCallback }) => {
    return <FormControl disabled={isLoading} fullWidth>
        <InputLabel sx={{ bgcolor: 'white' }}>How many?</InputLabel>
        <Select
            labelId="quantity-select-label"
            id="quantity-select"
            value={item?.quantity}
            onChange={(e) => onChangeCallback(e.target.value.toString())}
            //onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
            sx={{
                '& fieldset': {
                    borderColor: '#D5DFE9',
                }
            }}
        >
            {menuItems.map((v) => <MenuItem value={v}>{v}</MenuItem>)}
        </Select>
    </FormControl>
}