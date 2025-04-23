import { Button, Card, Typography } from "@mui/material"

interface Props {
    clickCallback: () => void;
}

const EmptyListMsg: React.FC<Props> = ({clickCallback}) => {
    return <Card className='center emptyListContainer' sx={{ borderColor: 'divider',  mb: 'auto', mt: '12%'  }} elevation={0}>
        <Typography className='emptyListMsg' fontSize={'18px'} fontWeight={400} lineHeight={'24px'}>
            Your shopping list is empty :(
        </Typography>
        <Button
            onClick={clickCallback}
            variant="contained"
            disableElevation={true}
            color='secondary'
            sx={{ padding: '8px 15px', fontSize: '14px', lineHeight: '20px', fontWeight: '600' }}
        >
            Add your first item
        </Button>
    </Card>
}

export default EmptyListMsg;