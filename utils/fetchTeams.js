// file: /utils/fetchTeams.js
import axios from 'axios';

export const fetchTeams = async () => {
  try {
    const response = await axios.get('/api/team'); // Correct endpoint for fetching teams
    const teams = [...new Set(response.data.map(player => player.Tm))].map(Tm => ({ Tm }));
    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
