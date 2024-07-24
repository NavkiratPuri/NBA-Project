import axios from 'axios';

export const fetchPlayers = async (team) => {
  try {
    const response = await axios.get(`/api/getPlayerData/${team}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export default fetchPlayers;
