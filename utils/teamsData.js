import axios from 'axios';


// function to fetch data from mongodb
const teamsData = async () => {
 
    const fetchTeamData  = async () => {
        try {
            const response = await axios.get('/api/team');
            setStandings(response.data);
            setFilteredStandings(response.data);
        } catch (error) {
            console.error('Error fetching standings:', error);
        }
        fetchTeamData();
    };
};

export default teamsData;