import playerData from '@/utils/playerData';
import calculatePlayerValue from '@/utils/calculateValue';

// Fetch player data from the API
const fetch60Player = async () => {
    try {
        const fetchdata = await playerData();
        const filteredData = fetchdata.filter(player => {
            const value = calculatePlayerValue(player).totalValue;
            return value >= 80;
        });
        return filteredData;
    } catch (error) {
        console.error('Error fetching player:', error);
        throw error;
    }
};

export default fetch60Player;
