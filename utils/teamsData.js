import axios from 'axios';


// function to fetch data from mongodb
const teamsData = async () => {
    try{
        const response = await axios.get('api/team');
        if (response.data) {
            return response.data;
        }
    }catch (error){
        console.error('error fetching teams data', error);
    }
};

export default teamsData;