async function showteam(id = null, query = null) {
  const container = document.getElementById('teams');
  container.innerHTML = `<p class="col-span-full text-center text-slate-400 text-lg animate-pulse">Loading teams...</p>`;

  const params = new URLSearchParams();
  if (id !== null) params.set('id', id);
  if (query !== null) params.set('query', query);

  const fullurl = '/api/teams?' + params.toString();
  console.log('Fetching team data from:', fullurl);

  try {
    const response = await fetch(fullurl);
    if (!response.ok) throw new Error('Network response was not ok');

    const { data: teams } = await response.json();

    if (!Array.isArray(teams) || teams.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center text-slate-400 text-lg">No teams found for this query.</p>`;
      return;
    }

    container.innerHTML = teams
      .map(
        (team) => `
      <div
        class="bg-white/5 border border-slate-600 rounded-3xl p-6 transition-all duration-200 hover:shadow-2xl hover:bg-white/10 cursor-pointer flex flex-col"
      >
        <h3 class="text-4xl font-jua text-indigo-400 mb-2">${team.number}</h3>
        <h4 class="text-2xl font-semibold text-slate-200 mb-4">${team.team_name}</h4>
        <div class="space-y-1 text-slate-300 flex-grow">
          <p><strong>Team Name:</strong> ${team.robot_name || 'N/A'}</p>
          <p><strong>Organization:</strong> ${team.organization || 'N/A'}</p>
          <p><strong>Location:</strong> ${team.location?.city || 'N/A'}, ${team.location?.region || 'N/A'}, ${team.location?.country || 'N/A'}</p>
          <p><strong>Program:</strong> ${team.program?.name || 'N/A'}</p>
          <p><strong>Grade:</strong> ${team.grade || 'N/A'}</p>
        </div>
      </div>
    `,
      )
      .join('');
  } catch (error) {
    console.error('Failed to fetch team with error:', error);
    container.innerHTML = `<p class="col-span-full text-center text-red-500 text-lg">Error loading teams. Please try again later.</p>`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  showteam(null, localStorage.getItem('comp') || null);
});
