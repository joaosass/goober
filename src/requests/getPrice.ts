interface GetPriceProps {
  distance: number;
  lat: number;
  lng: number;
}

export default async function getPrice({ distance, lat, lng }: GetPriceProps) {
  const response = await fetch(`/api/price?distance=${distance}&lat=${lat}&lng=${lng}`);
  return response.json();
}