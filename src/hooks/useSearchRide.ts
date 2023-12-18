import { useMutation, useQuery } from "@tanstack/react-query";

import { useCallback, useEffect, useRef, useState } from "react";

import declineRide from "@requests/declineRide";
import finishRide from "@requests/finishRide";
import searchRides from "@requests/searchRides";
import updateRideStatus from "@requests/updateRideStatus";
import useStore from "@store";

export default function useSearchRide() {
  const [isEnabled, setIsEnabled] = useState(true);
  const {
    acceptedRide,
    driverStatus,
    plate,
    setAcceptedRide,
    setArrival,
    setDeparture,
    setStartedRide,
  } = useStore();
  const timeRef = useRef(0);

  const { data, refetch,  } = useQuery({
    enabled: driverStatus && isEnabled,
    queryKey: ['search-ride', plate],
    queryFn: () => searchRides(plate),
    refetchInterval: 5000,
  });

  const { mutate: mutateDecline } = useMutation({
    mutationFn: declineRide,
    onSuccess: () => {
      setAcceptedRide(false);
      refetch();
    }
  });

  const { mutate: mutateAccept } = useMutation({
    mutationFn: updateRideStatus,
    onSuccess: () => {
      const riderDeparture = { lat: () => data.ride.departure.x, lng: () => data.ride.departure.y } as google.maps.LatLng;
      setArrival(riderDeparture);
      setAcceptedRide(true);
    }
  });

  const { mutate: mutateStart } = useMutation({
    mutationFn: updateRideStatus,
    onSuccess: () => {
      const riderArrival = { lat: () => data.ride.arrival.x, lng: () => data.ride.arrival.y } as google.maps.LatLng;
      const riderDeparture = { lat: () => data.ride.departure.x, lng: () => data.ride.departure.y } as google.maps.LatLng;

      setStartedRide(true);
      setDeparture(riderDeparture);
      setArrival(riderArrival);
    }
  });

  const { mutate: mutateFinish } = useMutation({
    mutationFn: finishRide,
    onSuccess: () => {
      setIsEnabled(true);
      refetch();
      setAcceptedRide(false);
      setStartedRide(false);
    }
  });

  const handleDecline = useCallback(() => mutateDecline({ id: data.ride.id }), [data, mutateDecline]);

  const handleAccept = () => {
    window.clearTimeout(timeRef.current);
    mutateAccept({ id: data.ride.id });
  };

  const handleStart = () => {
    window.clearTimeout(timeRef.current);
    mutateStart({ id: data.ride.id, started: true });
  }

  const handleFinish = () => {
    mutateFinish({ id: data.ride.id, plate });
  }

  useEffect(() => {
    setIsEnabled(!Boolean(data?.ride));

    if (data?.ride && !acceptedRide) {
      timeRef.current = window.setTimeout((acceptedRide: boolean, rideId?: number) => {
        if (rideId && !acceptedRide) {
          handleDecline();
        }
      }, 10000, acceptedRide, data?.ride?.id);
    } else {
      window.clearTimeout(timeRef.current);
    }
  }, [data, acceptedRide, handleDecline]);


  return {
    data,
    acceptRide: handleAccept,
    declineRide: handleDecline,
    finishRide: handleFinish,
    startRide: handleStart
  }
}
