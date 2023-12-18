export default async function getRideStatus(id: number) {
  const response = await fetch(`/api/ride?id=${id}`);
  return response.json();
}