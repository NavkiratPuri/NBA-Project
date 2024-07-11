import axios from 'axios';

// function to fetch data from mongodb and combine with player images
const playerData = async () => {
    try {
        // Fetch player data from MongoDB
        const playerResponse = await axios.get('api/player');
        if (playerResponse.data) {
            // Fetch player images
            const imageResponse = await fetch('/player_images.json');
            if (!imageResponse.ok) {
                throw new Error('Failed to fetch player images');
            }
            const playerImages = await imageResponse.json();

            // Combine player data with images
            const playersWithImages = playerResponse.data.map(player => ({
                ...player,
                image: playerImages[player.Player] || ''
            }));
            return playersWithImages;
        }
    } catch (error) {
        console.error('Error fetching player data', error);
        throw error;
    }
};

export default playerData;