interface FinishRideProps {
  id: number;
  plate: string;
}

export default async function finishRide(body: FinishRideProps) {
  const response = await fetch('/api/ride', {
    method: "PATCH",
    body: JSON.stringify(body)
  });

  return response.json();
}