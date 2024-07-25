import axios from "axios";

export const fetchPlayerTeam = async (tea) => {
  try {
    const response = await axios.get(`/api/getPlayerData/${tea}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
