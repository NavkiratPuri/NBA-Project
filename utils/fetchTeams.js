import axios from 'axios';

export const fetchTeams = async () => {
  const response = await axios.get('/api/teams');
  return response.data;
};
