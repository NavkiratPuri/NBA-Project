import axios from 'axios';

export const fetchTeamDetails = async (teamId) => {
  const response = await axios.get(`/api/teams/${teamId}`);
  return response.data;
};
