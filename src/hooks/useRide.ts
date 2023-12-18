import { useMutation, useQuery } from "@tanstack/react-query";

import createRide from "@requests/createRide";
import getPrice from "@requests/getPrice";
import useStore from "@store";

export default function useRide() {
  const { arrival, departure, rideDetails, setCurrentDriveId, setWaitingDriver } = useStore();

  const { data } = useQuery({
    enabled: Boolean(rideDetails.distance),
    queryKey: ['price', rideDetails.distance],
    queryFn: () => getPrice({
      distance: rideDetails.distance,
      lat: departure.lat,
      lng: departure.lng
    }),
  });

  const { mutate, status } = useMutation({
    mutationFn: createRide,
    onSuccess: (data) => {
      setCurrentDriveId(data.id);
      setWaitingDriver(true);
    }
  });

  const handleRide = () => mutate({ arrival, departure, value: data.price });

  const isLoading = status === 'pending';

  return { handleRide, isLoading};
}
