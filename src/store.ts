import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

interface Coordinates {
  lat: number,
  lng: number,
}

interface RideDetails {
  distance: number;
  duration: string;
}

interface State {
  acceptedDriver: string;
  acceptedRide: boolean;
  arrival: Coordinates;
  arrivalTemp: Coordinates;
  currentDriveId: number;
  departure: Coordinates;
  driverStatus: boolean;
  emptyQueue: boolean;
  payment: number;
  plate: string;
  rideDetails: RideDetails;
  startedRide: boolean;
  waitingDriver: boolean;
  setAcceptedDriver: (acceptedDriver: string) => void;
  setAcceptedRide: (acceptedRide: boolean) => void;
  setArrival: (coordinates?: google.maps.LatLng) => void;
  setCurrentDriveId: (driveId: number) => void;
  setDeparture: (coordinates?: google.maps.LatLng) => void;
  setDriverStatus: (driverStatus: boolean) => void;
  setEmptyQueue: (emptyQueue: boolean) => void;
  setPayment: (payment: number) => void;
  setPlate: (plate: string) => void;
  setRideDetails: (rideDetails: google.maps.DirectionsLeg) => void;
  setStartedRide: (startedRide: boolean) => void;
  setWaitingDriver: (waitingDriver: boolean) => void;
}

const defaultCoordinates = { lat: 0, lng: 0 };
const defaultRideDetails = { distance: 0, duration: '' };

const handleCoordinates = (coordinates?: google.maps.LatLng) => {
  if (!coordinates) return defaultCoordinates;

  return { lat: coordinates?.lat(), lng: coordinates?.lng() }
}

const handleRideDetails = (rideDetails?: google.maps.DirectionsLeg) => {
  if (!rideDetails) return defaultRideDetails;

  return {
    distance: rideDetails.distance?.value || 0,
    duration: rideDetails.duration?.text || ''
  }
}

const useStore = create<State>()(
  devtools(
    (set) => ({
      acceptedDriver:'',
      acceptedRide: false,
      arrival: defaultCoordinates,
      arrivalTemp: defaultCoordinates,
      currentDriveId: 0,
      departure: defaultCoordinates,
      driverStatus: false,
      emptyQueue: false,
      payment: 0,
      plate: '',
      rideDetails: defaultRideDetails,
      startedRide: false,
      waitingDriver: false,
      setAcceptedDriver: (acceptedDriver) => set(() => ({ acceptedDriver })),
      setAcceptedRide: (acceptedRide) => set(() => ({ acceptedRide })),
      setArrival: (coordinates) => set(({ arrival }) => ({ arrival: handleCoordinates(coordinates), arrivalTemp: arrival })),
      setCurrentDriveId: (currentDriveId) => set(() => ({ currentDriveId })),
      setDeparture: (coordinates) => set(() => ({ departure: handleCoordinates(coordinates) })),
      setDriverStatus: (driverStatus) => set(() => ({ driverStatus })),
      setEmptyQueue: (emptyQueue) => set(() => ({ emptyQueue })),
      setPayment: (payment) => set(() => ({ payment })),
      setPlate: (plate) => set(() => ({ plate })),
      setRideDetails: (rideDetails) => set(() => ({ rideDetails: handleRideDetails(rideDetails) })),
      setStartedRide: (startedRide) => set(() => ({ startedRide })),
      setWaitingDriver: (waitingDriver) => set(() => ({ waitingDriver })),
    })
  )
)

export default useStore;