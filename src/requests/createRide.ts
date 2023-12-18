interface ActivateDriverProps {
  arrival: {
    lat: number;
    lng: number;
  },
  departure: {
    lat: number;
    lng: number;
  },
  value: number;
}

export default async function createRide(body: ActivateDriverProps) {
  const response = await fetch('/api/ride', {
    method: "POST",
    body: JSON.stringify(body)
  });

  return response.json();
}