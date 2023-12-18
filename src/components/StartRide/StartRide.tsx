import { Button, Card, Stack, Typography } from "@mui/material";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

interface StartRideProps {
  declineRide: () => void;
  startRide: () => void;
}

export default function StartRide({ declineRide, startRide }: StartRideProps ) {
  return (
    <Stack position="absolute" bottom={8} left="50%" sx={{ transform: 'translateX(-50%)'}} zIndex={10}>
      <Card variant="elevation">
        <Stack gap={1} py={3} px={5} alignItems="center">
          <LocalTaxiIcon color="primary" fontSize="large" />
          <Typography fontWeight="bold">Please go to the departure point</Typography>
          <Stack direction="row" gap={2} mt={1}>
            <Button color="error" onClick={declineRide}>Cancel ride</Button>
            <Button variant="contained" color="primary" onClick={startRide}>Start ride</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
