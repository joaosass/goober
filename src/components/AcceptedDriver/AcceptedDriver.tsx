import { Button, Card, Stack, Typography } from "@mui/material";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useMutation } from "@tanstack/react-query";

import useWaitingDriver from "@hooks/useWaitingDriver";
import cancelRide from "@requests/cancelRide";
import useStore from "@store";

import styles from './driverstatus.module.css';

export default function Map() {
  const { acceptedDriver } = useStore();

  return (
    <Stack position="absolute" bottom={8} left="50%" sx={{ transform: 'translateX(-50%)'}}>
      <Card variant="elevation">
        <Stack gap={1} py={2} px={4} alignItems="center">
          <LocalTaxiIcon color="primary" fontSize="large" />
          <Typography textAlign="center">We have a driver on the way, with the license plate {acceptedDriver}</Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
