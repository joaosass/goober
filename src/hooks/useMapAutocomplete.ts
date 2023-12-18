import { usePlacesWidget } from 'react-google-autocomplete';

import useStore from '@store';
import { GOOGLE_MAPS_CONFIG } from './constants';

export default function useMapAutocomplete() {
  const { setArrival, setDeparture } = useStore();

  const { ref: inputRefDeparture } = usePlacesWidget({
    ...GOOGLE_MAPS_CONFIG,
    onPlaceSelected: (place) => {
      setDeparture(place?.geometry?.location);
    }
  });
  const { ref: inputRefArrival } = usePlacesWidget({
    ...GOOGLE_MAPS_CONFIG,
    onPlaceSelected: (place) => {
      setArrival(place?.geometry?.location);
    }
  });

  return {
    inputRefDeparture,
    inputRefArrival
  }
}
