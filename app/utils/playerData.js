import axios from 'axios';


// function to fetch data from mongodb
const playerData = async () => {
    try{
        const response = await axios.get('api/player');
        if (response.data) {
            return response.data;
        }
    }catch (error){
        console.error('error fetching player data', error);
    }
};

export default playerData;