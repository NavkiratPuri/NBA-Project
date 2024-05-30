

const fetchPlayer = async () => {
    try {
        const response = await axios.get('/api/player');
        setTeam(response.data);
    } catch (error) {
        console.error('Error fetching player:', error);
    }
};

const HiLo = () => {
    //Random player or team
    let choice = [1, 2]
    let randomChoice = shuffle(choice)

    if (randomChoice == 1){
        //Random players
        let players = fetchPlayer

    }
    else if(randomChoice == 2){
         //Random teams

    }
}

return (

);