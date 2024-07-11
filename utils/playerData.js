import axios from 'axios';

// function to fetch data from MongoDB and combine with player images and team logos
const playerData = async () => {
    try {
        // Fetch player data from MongoDB
        const playerD = await axios.get('api/player');
        if (playerD.data) {
            // Fetch player images
            const playerI = await fetch('/player_images.json');
            if (!playerI.ok) {
                throw new Error('Failed to fetch images');
            }
            const playerImages = await playerI.json();

            // Fetch team logos
            const playerTL = await fetch('/team_logos.json');
            if (!playerTL.ok) {
                throw new Error('Failed to fetch team logos');
            }
            const teamLogos = await playerTL.json();

            // Combine player data with images and team logos
            const playerDataCombined = playerD.data.map(player => ({
                ...player,
                image: playerImages[player.Player] || playerImages.defualt,
                teamLogo: teamLogos[player.Tm]?.logo || teamLogos.default 
            }));
            return playerDataCombined;
        }
    } catch (error) {
        console.error('Error fetching player data', error);
        throw error;
    }
};

export default playerData;
