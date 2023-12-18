'use client'
import {  Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import useStore from '@store';
import { formatMoney } from '@utils/formatMoney';

export default function RideSuccess() {
  const { payment } = useStore();

  return (
    <Stack alignItems="center" justifyContent="center" gap={2} height="calc(100dvh - 60px)">
      <CheckCircleOutlineIcon color="success" fontSize="large" />
      <Typography variant="h5" maxWidth={350} textAlign="center">Ride completed successfully, pay $ {formatMoney(payment)} to the driver</Typography>
    </Stack>
  )
}
