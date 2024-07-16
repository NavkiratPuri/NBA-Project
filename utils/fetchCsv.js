import axios from 'axios';

const fetchCSV = async () => {
    try {
        const response = await axios.get('/api/csv');
        return response.data;
    } catch (error) {
        console.error('Error fetching player data from CSV:', error);
        throw error;
    }
};

export default fetchCSV;