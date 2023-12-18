import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

import cancelRide from "@requests/cancelRide";
import declineRide from "@requests/declineRide";
import getDriverPosition from "@requests/getDriverPostion";
import getRideStatus from "@requests/getRideStatus";
import useStore from "@store";

const MAX_DRIVER_CHECKS = 4;

export default function useWaitingDriver() {
  const [driverCounter, setDriverCounter] = useState(0);
  const [currentDriverQueue, setCurrentDriverQueue] = useState('');
  const router = useRouter();

  const {
    acceptedDriver,
    arrivalTemp,
    currentDriveId,
    startedRide,
    waitingDriver,
    setAcceptedDriver,
    setArrival,
    setCurrentDriveId,
    setDeparture,
    setEmptyQueue,
    setPayment,
    setStartedRide,
    setWaitingDriver
  } = useStore();

  const { data, isFetching, isFetched } = useQuery({
    enabled: waitingDriver,
    queryKey: ['waiting-driver'],
    queryFn: () => getRideStatus(currentDriveId),
    refetchInterval: 5000,
  });

  const { data: dataDriver } = useQuery({
    enabled: Boolean(acceptedDriver),
    queryKey: ['get-driver-position', acceptedDriver],
    queryFn: () => getDriverPosition(acceptedDriver),
  });

  const { mutate: mutateDecline } = useMutation({
    mutationFn: declineRide
  });

  const { mutate: mutateCancel } = useMutation({
    mutationFn: cancelRide
  });

  const handleInactiveDriver = () => {
    mutateDecline({ id: currentDriveId });
      setDriverCounter(0);
      setCurrentDriverQueue('');
    }

    const handleEmptyQueue = () => {
      mutateCancel({ id: currentDriveId });
      setArrival();
      setCurrentDriveId(0);
      setDeparture();
      setEmptyQueue(true);
      setWaitingDriver(false);
      window.setTimeout(() => {
        window.location.reload();
      }, 3000);
  }

  const handleDriverQueue = (queue: string[]) => {
    setAcceptedDriver('');
    if (!queue.length) {
      handleEmptyQueue();
    }

    const nextDriverCounter = driverCounter + 1;
    if (nextDriverCounter === MAX_DRIVER_CHECKS) {
      handleInactiveDriver();
      return;
    }

    if (!currentDriverQueue) {
      setCurrentDriverQueue(queue[0]);
    }
    setDriverCounter(nextDriverCounter);
  };

  const handleDriverAccept = (driverId: string) => {
    if (!acceptedDriver) {
      setAcceptedDriver(driverId);
    }
  }

  const handleDriverStarted = () => {
    if (!startedRide) {
      setStartedRide(true);
      setArrival({ lat: () => arrivalTemp.lat, lng: () => arrivalTemp.lng } as google.maps.LatLng);
    }
  }

  const handleDriverFinished = (value: number) => {
    setPayment(value);
    router.push('ride-success');
  }

  useEffect(() => {
    if (data?.ride?.ride_status === 'WAITING_FOR_DRIVER' && !isFetching && isFetched) {
      handleDriverQueue(data.ride.drivers_queue);
      return;
    }

    if (data?.ride?.ride_status === 'DRIVER_ACCEPTED_RIDE' && !isFetching) {
      handleDriverAccept(data.ride.drivers_queue[0]);
      return;
    }

    if (data?.ride?.ride_status === 'DRIVER_STARTED_RIDE' && !isFetching) {
      handleDriverStarted();
      return
    }

    if (data?.ride?.ride_status === 'FINISHED' && !isFetching) {
      handleDriverFinished(data.ride.value);
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (dataDriver?.driver?.last_position) {
      const driverLat = () => dataDriver.driver.last_position.x;
      const driverLng = () => dataDriver.driver.last_position.y;
      setArrival({ lat: driverLat, lng: driverLng } as google.maps.LatLng);
    }
  }, [dataDriver]);

  return;
}
