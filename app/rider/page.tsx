'use client'
import { Button, Stack, TextField } from '@mui/material';
import HailIcon from '@mui/icons-material/Hail';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import DriverStatus from '@components/DriverStatus';
import EmptyState from '@components/EmptyState';
import Map from '@components/Map';
import RideDetails from '@components/RideDetails';
import Sidebar from '@components/Sidebar';
import useMapAutocomplete from '@hooks/useMapAutocomplete';
import useRide from '@hooks/useRide';
import useStore from '@store';

import styles from './rider.module.css';

export default function Rider() {
  const { inputRefArrival, inputRefDeparture } = useMapAutocomplete();
  const { arrival, departure, emptyQueue, waitingDriver } = useStore();
  const { isLoading, handleRide: createRide } = useRide();

  const isDisable = !departure.lat || !arrival.lat;

  return (
    <Stack direction="row">
      <Sidebar>
        <Stack pb={4} position="relative" className={styles.divider}>
          <TextField InputProps={{
            endAdornment: <RoomOutlinedIcon />
          }} label="Departure" inputRef={inputRefDeparture} />
        </Stack>
        <Stack pb={4}>
          <TextField InputProps={{
            endAdornment: <RoomOutlinedIcon />
          }} label="Arrival" inputRef={inputRefArrival} />
        </Stack>
        <Button
          disabled={isDisable || isLoading || waitingDriver}
          onClick={createRide}
          variant="contained"
        >
          {isLoading ? 'Loading...' : 'Find a ride'}
        </Button>
      </Sidebar>
      {departure.lat ? <Stack flexGrow={1} position="relative">
        <Map />
        <RideDetails />
        <DriverStatus />
      </Stack> : emptyQueue ?
        <EmptyState icon={<SentimentVeryDissatisfiedIcon />} text="Unfortunately we don't have drivers nearby, please try later" /> :
        <EmptyState icon={<HailIcon />} text="Let's ask ride?" /> }
    </Stack>
  )
}
