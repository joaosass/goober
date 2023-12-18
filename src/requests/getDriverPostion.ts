export default async function getDriverPosition(id: string) {
  const response = await fetch(`/api/driverPosition?id=${id}`);
  return response.json();
}