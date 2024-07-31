import axios from 'axios';

const fetchPlayerImage = async (playerName) => {
  try {
    const response = await axios.get(`/api/playerImages/${encodeURIComponent(playerName)}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching player data:', error.response?.data || error.message);
  }
};

export default fetchPlayerImage;
