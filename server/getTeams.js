import fetch from 'node-fetch';

export async function getTeams(token, baseUrl) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  const pagesToFetch = [1, 2, 3];

  const promises = pagesToFetch.map(async (page) => {
    const url = `${baseUrl}&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch page ${page}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  });

  const results = await Promise.all(promises);
  const allTeams = results.flatMap((result) => result.data);

  return allTeams;
}
