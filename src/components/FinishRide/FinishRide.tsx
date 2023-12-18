import { Button, Card, Stack, Typography } from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { formatMoney } from "@utils/formatMoney";

interface StartRideProps {
  value: number;
  finishRide: () => void;
}

export default function FinishRide({ value, finishRide }: StartRideProps ) {
  return (
    <Stack position="absolute" bottom={8} left="50%" sx={{ transform: 'translateX(-50%)'}} zIndex={10}>
      <Card variant="elevation">
        <Stack gap={1} py={3} px={5} alignItems="center">
          <AttachMoneyOutlinedIcon color="primary" fontSize="large" />
          <Typography fontWeight="bold">When finish the ride you should receive ${formatMoney(value)}</Typography>
          <Stack alignItems="center" mt={1}>
            <Button variant="contained" color="primary" onClick={finishRide}>Finish ride</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
