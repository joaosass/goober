"use client"

import { Button, Stack } from '@mui/material'
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const changeRoute = (path: string) => router.push(path);

  return (
    <Stack alignItems="center" direction="row" gap={4} height="calc(100dvh - 60px)" justifyContent="center" width="100%">
      <Button startIcon={<HailOutlinedIcon />} variant="contained" onClick={() => changeRoute("rider")}>I want a ride</Button>
      <Button startIcon={<LocalTaxiOutlinedIcon />} variant="contained" onClick={() => changeRoute("driver")}>I want to drive</Button>
    </Stack>
  )
}
