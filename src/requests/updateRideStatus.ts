interface UpdateRideStatusProps {
  id: number;
  started?: boolean;
}

export default async function updateRideStatus(body: UpdateRideStatusProps) {
  const response = await fetch('/api/ride', {
    method: "PUT",
    body: JSON.stringify(body)
  });

  return response.json();
}