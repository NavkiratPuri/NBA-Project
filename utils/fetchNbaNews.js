import axios from "axios";
 
const API_URL = "https://nba-stories.onrender.com/articles";
 
export const fetchNbaNews = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching NBA news:", error);
    return [];
  }
};