import { CircularProgress } from "@mui/material"

interface Props {
    size?: string;
    sx?: Object;
}

export const LoadingSpinner = ({size = '76px', sx = { mb: 'auto', mt: '12%' }}:Props) => {
    return <CircularProgress size={size} thickness={2} sx={sx} />
}