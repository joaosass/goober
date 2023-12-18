import { Button, Card, LinearProgress, Stack, Typography } from "@mui/material";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

import StartRide from "@components/StartRide";
import FinishRide from "@components/FinishRide";
import useSearchRide from "@hooks/useSearchRide";
import useStore from "@store";
import { formatMoney } from "@utils/formatMoney";

import styles from './foundride.module.css';

export default function Map() {
  const  { acceptedRide, startedRide } = useStore();
  const {
    data,
    acceptRide,
    declineRide,
    finishRide,
    startRide
  } = useSearchRide();

  if (!data?.ride) {
    return null
  }

  if (startedRide) {
    return <FinishRide value={data.ride.value} finishRide={finishRide} />
  }

  if (acceptedRide) {
    return <StartRide declineRide={declineRide} startRide={startRide} />
  }

  return (
    <Stack position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)'}}>
      <Card variant="elevation">
        <Stack className={styles.progress} height={5} sx={(theme) => ({ background: theme.palette.primary.main })} />
        <Stack gap={1} py={3} px={5} alignItems="center">
          <LocalTaxiIcon color="primary" fontSize="large" />
          <Typography fontWeight="bold">We found a ride for ${formatMoney(data.ride.value)}</Typography>
          <Stack direction="row" gap={2} mt={1}>
            <Button color="error" onClick={declineRide}>Decline</Button>
            <Button variant="contained" color="primary" onClick={acceptRide}>Accept</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
