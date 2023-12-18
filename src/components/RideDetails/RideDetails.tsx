import { Card, Stack, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { useQuery } from "@tanstack/react-query";

import getPrice from "@requests/getPrice";
import useStore from "@store";
import { formatMoney } from "@utils/formatMoney";

export default function Map() {
  const { departure: { lat, lng}, rideDetails } = useStore();

  const { data, isLoading, isFetched } = useQuery({
    enabled: Boolean(rideDetails.distance),
    queryKey: ['price', rideDetails.distance],
    queryFn: () => getPrice({ distance: rideDetails.distance, lat, lng }),
  });

  if (!rideDetails.distance) {
    return null
  }

  return (
    <Stack position="absolute" top={8} left={8}>
      <Card variant="elevation">
        <Stack gap={1} p={2}>
          <Stack direction="row" gap={1.5} alignItems="center">
            <RoomOutlinedIcon />
            {rideDetails.distance ? <Typography>{(rideDetails.distance / 1000).toFixed(1)} km</Typography> : null}
          </Stack>
          <Stack direction="row" gap={1.5} alignItems="center">
            <AccessTimeIcon />
            {rideDetails.duration ? <Typography>{rideDetails.duration}</Typography> : null}
          </Stack>
          <Stack direction="row" gap={1.5} alignItems="center">
            <AttachMoneyOutlinedIcon />
            <Typography>{isLoading || !isFetched ? 'Carregando...' : formatMoney(data.price)}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
