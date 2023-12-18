interface ActivateDriverProps {
  lat: number;
  lng: number;
  plate: string;
}

export default async function activateDriver(body: ActivateDriverProps) {
  const response = await fetch('/api/driver', {
    method: "POST",
    body: JSON.stringify(body)
  });

  return response.json();
}