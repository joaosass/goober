import { Button, Card, Stack, Typography } from "@mui/material";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useMutation } from "@tanstack/react-query";

import AcceptedDriver from "@components/AcceptedDriver";
import useWaitingDriver from "@hooks/useWaitingDriver";
import cancelRide from "@requests/cancelRide";
import useStore from "@store";

import styles from './driverstatus.module.css';

export default function Map() {
  const {
    acceptedDriver,
    currentDriveId,
    startedRide,
    waitingDriver
  } = useStore();
  useWaitingDriver();

  const { mutate, status } = useMutation({
    mutationFn: cancelRide,
    onSuccess: () => {
      window.location.reload();
    }
  });

  if (!waitingDriver || startedRide) {
    return null
  }

  if (acceptedDriver) {
    return <AcceptedDriver />
  }

  const handleMutation = () => mutate({ id: currentDriveId });

  const isLoading = status === 'pending';
  return (
    <Stack position="absolute" bottom={8} left="50%" sx={{ transform: 'translateX(-50%)'}}>
      <Card variant="elevation">
        <Stack gap={1} py={2} px={4} alignItems="center" className={styles.pulse}>
          <LocalTaxiIcon color="primary" fontSize="large" />
          <Typography>Waiting for driver...</Typography>
          <Button color="error" disabled={isLoading} onClick={handleMutation}>
            {isLoading ? 'Loading...' : 'Cancel'}
          </Button>
        </Stack>
      </Card>
    </Stack>
  )
}
