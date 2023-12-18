interface DeactivateDriverProps {
  plate: string;
}

export default async function deactivateDriver(body: DeactivateDriverProps) {
  const response = await fetch('/api/driver', {
    method: "PATCH",
    body: JSON.stringify(body)
  });

  return response.json();
}