import axios from "axios";

export const fetchPlayers = async () => {
  try {
    const response = await axios.get("/api/player");
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};
