import axios from 'axios';

const fetchTeam = async (id) => {
  try {
    const response = await axios.get(`/api/team/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching team data', error);
  }
};

export default fetchTeam;
