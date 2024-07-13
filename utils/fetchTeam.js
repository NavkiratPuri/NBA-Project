import axios from 'axios';


// function to fetch data from mongodb
const fetchTeam = async (id) => {
    try{
        const response = await axios.get(`api/team/${id}`);
        if (response.data) {
            return response.data;
        }
    }catch (error){
        console.error('error fetching team data', error);
    }
};

export default fetchTeam;