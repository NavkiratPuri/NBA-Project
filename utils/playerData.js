import fetchCSV from './fetchCsv';

const playerData = async () => {
    try {
        // Fetch player data from CSV
        const playerD = await fetchCSV();
        if (playerD) {
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
            const playerDataCombined = playerD.map(player => ({
                ...player,
                image: playerImages[player.Player] || playerImages.default,
                teamLogo: teamLogos[player.Tm]?.logo || teamLogos.default
            }));
            return playerDataCombined;
        }
    } catch (error) {
        console.error('Error fetching player data:', error);
        throw error;
    }
};

export default playerData;