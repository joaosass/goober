'use client'
import { Button, Stack, TextField, Typography } from '@mui/material'
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { useMutation } from '@tanstack/react-query';

import Map from '@components/Map';
import FoundRide from '@components/FoundRide';
import Sidebar from '@components/Sidebar';
import useMapAutocomplete from '@hooks/useMapAutocomplete';
import useOffline from '@hooks/useOffline';
import useStore from '@store';
import activateDriver from '@requests/activateDriver';
import EmptyState from '@components/EmptyState';

export default function Driver() {
  useOffline();
  const { inputRefDeparture } = useMapAutocomplete();
  const {
    acceptedRide,
    departure: { lat, lng },
    driverStatus,
    plate,
    setDriverStatus,
    setPlate
  } = useStore();

  const { mutate, status } = useMutation({
    mutationFn: activateDriver,
    onSuccess: () => {
      setDriverStatus(true);
    }
  });

  const changeStatus = () => mutate({ lat, lng, plate });

  const isDisabled = !lat || !plate;
  const isLoading = status === 'pending';

  return (
    <Stack direction="row">
      <Sidebar>
        <Stack pb={4} position="relative">
          <TextField
            InputProps={{
              endAdornment: <LocalTaxiOutlinedIcon />
            }}
            label="Car plate"
            onChange={({ target }) => setPlate(target.value)}
          />
        </Stack>
        <Stack pb={4}>
          <TextField InputProps={{
            endAdornment: <RoomOutlinedIcon />
          }} label="My location" inputRef={inputRefDeparture} />
        </Stack>
        <Button
          disabled={isDisabled || isLoading || driverStatus}
          onClick={changeStatus}
          variant="contained"
        >
          {isLoading ? 'Loading...' : 'I am ready for rides'}
        </Button>
      </Sidebar>
      <Stack flexGrow={1} position="relative">
        {!acceptedRide ?
          <EmptyState
            icon={<LocalTaxiOutlinedIcon />}
            text={driverStatus ? 'Waiting for rides...' : 'I am not ready for rides'}
          /> :
        null}
        <FoundRide />
        {acceptedRide ? <Map /> : null}
      </Stack>
    </Stack>
  )
}
