import fetch from 'node-fetch';

export async function getTeams(token, baseUrl) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  const pagesToFetch = [1, 2, 3];

  const promises = pagesToFetch.map((page) => {
    const url = `${baseUrl}&page=${page}`;
    return fetch(url, { headers }).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch page ${page}: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  });

  const results = await Promise.all(promises);
  const allTeams = results.flatMap((result) => result.data);

  return allTeams;
}
