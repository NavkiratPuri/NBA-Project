import axios from 'axios';


// function to fetch data from mongodb
const fetchPlayer = async (id) => {
    try{
        const response = await axios.fetch(`api/player/${id}`);
        if (response.data) {
            return response.data;
        }
    }catch (error){
        console.error('error fetching player data', error);
    }
};

export default fetchPlayer;