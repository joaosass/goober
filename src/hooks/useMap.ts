import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { useEffect, useRef, useState } from "react"

import useStore from "@store";
import { GOOGLE_MAPS_ROUTE_CONFIG, GOOGLE_MAPS_STYLE } from "./constants";

export default function useMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [directionsRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
  const [directionsService, setDirectionService] = useState<google.maps.DirectionsService>();
  const { arrival, departure, setEmptyQueue, setRideDetails } = useStore();

  useEffect(() => {
    const checkRef = window.setInterval((mapRef: HTMLDivElement, map: google.maps.Map) => {
      if (mapRef && window.google && !map) {
        window.clearInterval(checkRef);
        setMap(new window.google.maps.Map(mapRef, {}));
        setDirectionRenderer(new window.google.maps.DirectionsRenderer(GOOGLE_MAPS_ROUTE_CONFIG));
        setDirectionService(new window.google.maps.DirectionsService());
      }
    }, 500, mapRef.current, map);
  }, [mapRef, map]);

  useEffect(() => {
    if (map && departure.lat) {
      map.setCenter(departure);
      map.setZoom(14);
      map.setOptions({
        clickableIcons: false,
        disableDefaultUI: true,
        draggable: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        noClear: true,
        rotateControl: false,
        scrollwheel: false,
        zoomControl: false,
        styles: GOOGLE_MAPS_STYLE
      });
    }
  }, [map, departure]);

  useEffect(() => {
    if (map && directionsRenderer && directionsService && arrival.lat && departure.lat) {
      setEmptyQueue(false);
      directionsRenderer.setMap(null);
      directionsRenderer.setMap(map);

      directionsService.route({
        origin: departure,
        destination: arrival,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }).then((response) => {
        directionsRenderer.setDirections(response);
        setRideDetails(response.routes[0].legs[0]);
      })
    }
  }, [
    departure,
    arrival,
    directionsRenderer,
    directionsService,
    map,
    setEmptyQueue,
    setRideDetails
  ]);

  return mapRef;
}
