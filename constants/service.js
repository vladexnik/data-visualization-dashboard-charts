export async function fetchNewData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
