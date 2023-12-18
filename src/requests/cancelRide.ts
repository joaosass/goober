interface CancelRideProps {
  id: number;
}

export default async function cancelRide(body: CancelRideProps) {
  const response = await fetch('/api/ride', {
    method: "DELETE",
    body: JSON.stringify(body)
  });

  return response.json();
}