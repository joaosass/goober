interface DeclineRideProps {
  id: number;
}

export default async function declineRide(body: DeclineRideProps) {
  const response = await fetch('/api/driver', {
    method: "DELETE",
    body: JSON.stringify(body)
  });

  return response.json();
}