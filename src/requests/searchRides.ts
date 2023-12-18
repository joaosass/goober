export default async function searchRides(plate: string) {
  const response = await fetch(`/api/driver?plate=${plate}`);
  return response.json();
}